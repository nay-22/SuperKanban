const nextFrame = () => new Promise(resolve => requestAnimationFrame(resolve));

export default nextFrame;