import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';

let io;

export const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: process.env.FRONTEND_URL || 'http://localhost:5173',
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            credentials: true
        }
    });

    io.use((socket, next) => {
        const token = socket.handshake.auth.token;
        if (!token) {
            return next(new Error('Authentication error'));
        }
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            socket.user = decoded;
            next();
        } catch (err) {
            next(new Error('Authentication error'));
        }
    });

    io.on('connection', (socket) => {
        console.log(`Socket connected: ${socket.id} (User: ${socket.user.id}, Role: ${socket.user.role})`);
        
        // Join personal room
        socket.join(socket.user.id);
        
        // Join role room
        socket.join(`role:${socket.user.role}`);
        
        // Join branch room if exists
        if (socket.user.branch) {
            socket.join(`branch:${socket.user.branch}`);
        }

        socket.on('disconnect', () => {
            console.log(`Socket disconnected: ${socket.id}`);
        });

        // Chat Events
        socket.on('join_room', async (roomId) => {
            try {
                // Dynamically import to avoid circular dependency
                const { canAccessRoom } = await import('./controllers/chat.controller.js');
                const ChatRoom = (await import('./models/ChatRoom.js')).default;
                const User = (await import('./models/User.js')).default;

                const dbUser = await User.findById(socket.user.id);
                const room = await ChatRoom.findById(roomId);
                
                if (room && dbUser && await canAccessRoom(dbUser, room)) {
                    socket.join(roomId);
                    // Broadcast online status maybe
                } else {
                    socket.emit('chat_error', { message: 'Access denied' });
                }
            } catch (err) {
                console.error(err);
            }
        });

        socket.on('leave_room', (roomId) => {
            socket.leave(roomId);
        });

        socket.on('send_message', async (data) => {
            try {
                const { roomId, text, attachment } = data;
                
                const User = (await import('./models/User.js')).default;
                const dbUser = await User.findById(socket.user.id);

                if (dbUser.chatBlock?.blocked) {
                    if (!dbUser.chatBlock.until || new Date(dbUser.chatBlock.until) > new Date()) {
                        return socket.emit('chat_error', { message: 'You are blocked from sending messages', reason: dbUser.chatBlock.reason });
                    }
                }

                const { canAccessRoom } = await import('./controllers/chat.controller.js');
                const ChatRoom = (await import('./models/ChatRoom.js')).default;
                const room = await ChatRoom.findById(roomId);
                
                if (!room || !(await canAccessRoom(dbUser, room))) {
                    return socket.emit('chat_error', { message: 'Access denied' });
                }

                const Message = (await import('./models/Message.js')).default;
                const message = await Message.create({
                    room: roomId,
                    sender: dbUser._id,
                    text,
                    attachment
                });

                const populatedMessage = await message.populate('sender', 'name role');
                io.to(roomId).emit('new_message', populatedMessage);
            } catch (err) {
                console.error(err);
            }
        });

        socket.on('typing', ({ roomId, isTyping }) => {
            socket.to(roomId).emit('user_typing', { user: socket.user.id, name: socket.user.name, isTyping });
        });
    });

    return io;
};

export const getIO = () => {
    if (!io) {
        throw new Error('Socket.io not initialized');
    }
    return io;
};
