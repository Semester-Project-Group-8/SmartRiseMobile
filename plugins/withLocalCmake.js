// Points the Android native build at a newer CMake (bundling ninja >= 1.12) on Windows,
// so builds don't fail with "Filename longer than 260 characters".
// React Native defaults to CMake 3.22.1, whose ninja ignores the Windows LongPathsEnabled setting.
// Only applies when the CMake version is installed locally, so EAS / other machines are unaffected.
const fs = require('fs');
const path = require('path');
const { withDangerousMod } = require('expo/config-plugins');

const CMAKE_VERSION = '3.31.6';

module.exports = function withLocalCmake(config) {
  return withDangerousMod(config, [
    'android',
    (config) => {
      if (process.platform !== 'win32' || !process.env.LOCALAPPDATA) return config;

      const cmakeDir = path.join(process.env.LOCALAPPDATA, 'Android', 'Sdk', 'cmake', CMAKE_VERSION);
      if (!fs.existsSync(cmakeDir)) return config;

      const file = path.join(config.modRequest.platformProjectRoot, 'local.properties');
      const existing = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
      const line = `cmake.dir=${cmakeDir.replace(/\\/g, '/').replace(':', '\\:')}`;
      const kept = existing.split(/\r?\n/).filter((l) => l && !l.startsWith('cmake.dir='));
      fs.writeFileSync(file, [...kept, line].join('\n') + '\n');
      return config;
    },
  ]);
};
