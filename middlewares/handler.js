const createHandler = require("github-webhook-handler");
const { spawn } = require("child_process");

// 上面的 secret 保持和 GitHub 后台设置的一致
function run_cmd(cmd, args, callback) {
  const child = spawn(cmd, args);
  let resp = "";
  child.stdout.on("data", function(buffer) {
    resp += buffer.toString();
  });
  child.stdout.on("end", function() {
    callback(resp);
  });
}

export default (ctx, next) => {
  ctx.handler = createHandler({
    path: "/banta_fe",
    secret: "banta"
  });

  ctx.handler.on("error", function(err) {
    console.error("Error:", err.message);
  });

  ctx.handler.on("push", function(event) {
    console.log(
      "Received a push event for %s to %s",
      event.payload.repository.name,
      event.payload.ref
    );
    run_cmd("sh", ["./deploy.sh", event.payload.repository.name], text => {
      console.log(text);
    });
  });
  next();
};
