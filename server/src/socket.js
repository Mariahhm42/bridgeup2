export default function setupLobby(io) {
    const lobby = io.of('/lobby');
  
    lobby.on('connection', (socket) => {
      console.log('User connected to lobby:', socket.id);
  
      socket.on('join-room', ({ roomId, user }) => {
        socket.join(roomId);
        socket.to(roomId).emit('user-joined', user);
      });
  
      socket.on('send-message', ({ roomId, message }) => {
        lobby.to(roomId).emit('receive-message', message);
      });
  
      socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
      });
    });
  }