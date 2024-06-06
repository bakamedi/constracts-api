import * as fs from 'fs-extra';

export const mkDirByPathSync = async (path: string): Promise<boolean> => {
  try {
    await fs.ensureDir(path); // Esto crea el directorio si no existe
    await fs.chmod(path, 0o755); // Cambia los permisos del directorio
    return true;
  } catch (err) {
    if (err.code === 'EEXIST') {
      // curDir already exists!
      console.log(`Directory ${path} already exists!`);
      return false;
    }

    // To avoid `EISDIR` error on Mac and `EACCES`-->`ENOENT` and `EPERM` on Windows
    if (err.code === 'ENOENT') {
      // Throw the original parentDir error on path `ENOENT` failure.
      throw new Error(`EACCES: permission denied, mkdir '${path}'`);
    }

    const caughtErr = ['EACCES', 'EPERM', 'EISDIR'].indexOf(err.code) > -1;
    if (!caughtErr) {
      throw err; // Throw if it's just the last created dir.
    }
  }
};