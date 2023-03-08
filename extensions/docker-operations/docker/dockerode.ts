import Docker from "@priithaamer/dockerode";

export async function pullDockerImage(
  image: string,
): Promise<string> {
  const docker = new Docker();

  return new Promise((resolve, reject) => {
    docker.pull(`${image}`, (err: any, stream: any) => {
      if (err) {
        console.error(`Failed to pull ${image}: ${err}`);
        reject(err);
        return;
      }

      docker.modem.followProgress(stream, onFinished, onProgress);

      function onFinished(err: any, output: any) {
        if (err) {
          console.error(`Failed to pull ${image}}: ${err}`);
          reject(err);
          return;
        }

        console.log(`Successfully pulled ${image}`);
        resolve(`Successfully pulled ${image}`);
      }

      function onProgress(event: any) {
        console.log(`Downloading ${image}: ${event.status}`);
      }
    });
  });
}
