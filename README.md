# Duel-Way Connections

Let's make some duel way connections between stuff.

My primary focus here is to make a duel way connection between `.NET` & `NextJS`. But that is not very challenging. What could be challenging is making a duel way connection between much heterogeneous stuff. I add an extra `NodeJS` server to make it more challenging.

`.NET` has a nice library called `SignalR` which is a real-time communication library. It has a client library for `JavaScript` which can be used in `NextJS`. But what about `NodeJS`? When it comes to real-time communication in `NodeJS`, the first thing that comes to mind is `Socket.IO`. Looks like it is a challenge to make `SignalR` and `Socket.IO` work together. Let's see how it goes.

# Process

I am doing this stepwise. For each step, I make a new branch. Those branches are named `iteration_n`. `n` goes from 1 to ♾️

I am adding videos of each iteration in [history folder](./history/).

## Iteration 1

I think this is the most simplest duel-way connection between `NextJS` and `.NET`. Honestly this has nothing to do with `NextJS`, it is mostly `React`. Only thing you have to worry about is using the `SignalR` API on the client side.

[1st Iteration video](./history/1st%20iteration.mp4)

Maybe in the next iteration, I can try to use `SignalR` on the server side and make an explicit duel way connection between the client side and server side. Which of course is an unnecessary thing, but it is a good challenge!
