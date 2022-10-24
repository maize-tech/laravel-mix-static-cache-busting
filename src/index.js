let mix = require('laravel-mix');
const Task = require('laravel-mix/src/tasks/Task');
const fs = require('fs');
const path = require('path');

class StaticCacheBustingTask extends Task {

  async mainTask() {
    const mixManifest = JSON.parse(
      await fs.promises.readFile(path.resolve(this.data.mixManifest), 'utf8')
    );
    let index = await fs.promises.readFile(path.resolve(this.data.index), 'utf8');
    for (const asset in mixManifest) {
      index = index.replace(asset, mixManifest[asset]);
    }
    await fs.promises.writeFile(path.resolve(this.data.index), index);
  }

  run() {
    this.mainTask();
  }

  watch() {
    this.mainTask();
  }

}

class StaticCacheBusting {
  register(mixManifest, index) {
    Mix.addTask(new StaticCacheBustingTask({mixManifest, index}));
  }
}

mix.extend('staticCacheBusting', new StaticCacheBusting());
