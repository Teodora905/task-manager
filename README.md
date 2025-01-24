# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Instructions:
1. Navigate to the directory where you want to store the project.
cd path/to/directory

2. Clone the repository.
git clone https://github.com/Teodora905/task-manager.git

3.Install Dependencies
npm install --save

4. Run the Development Server
npm run dev

This command starts a local development server, usually on port 3000 or 8080 (depending on the setup). After running the command, you should see an output like:

> my-project@1.0.0 dev
> vue-cli-service serve

 DONE  Compiled successfully in 1234ms
  App running at:
  - Local:   http://localhost:8080/
  - Network: http://192.168.1.1:8080/

5. Open new terminal and run the JSON Server:
npx json-server --watch db.json --port 3000

After running the command, you should see an output like:

JSON Server started on PORT :3000
Press CTRL-C to stop
Watching db.json...

Index:
http://localhost:3000/

Static files:
Serving ./public directory if it exists

Endpoints:
http://localhost:3000/tasks
http://localhost:3000/task_types




Here is the site:
http://localhost:5173/

The site should contain two routes: Board View /home page/ and List View

