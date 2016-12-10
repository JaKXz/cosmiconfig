import test from 'ava';
import absolutePath from './helpers/absolutePath';
import cosmiconfig from '..';

const { load: loadConfig } = cosmiconfig();

test('defined JSON config path', (t) => {
  const jsonConfig = absolutePath('fixtures/foo.json');
  
  return loadConfig(null, jsonConfig)
    .then((result) => {
      t.deepEqual(result.config, {
        foo: true,
      });
      t.is(result.filepath, jsonConfig);
    });
});

test('defined YAML config path', (t) => {
  const yamlConfig = absolutePath('fixtures/foo.yaml');
  
  return loadConfig(null, yamlConfig)
    .then((result) => {
      t.deepEqual(result.config, {
        foo: true,
      });
      t.is(result.filepath, yamlConfig);
    });
});

test('defined JS config path', (t) => {
  const jsConfig = absolutePath('fixtures/foo.js');
  
  return loadConfig(null, jsConfig)
    .then((result) => {
      t.deepEqual(result.config, {
        foo: true,
      });
      t.is(result.filepath, jsConfig);
    });
});

test('defined modulized JS config path', (t) => {
  const jsConfig = absolutePath('fixtures/foo-module.js');
  
  return loadConfig(null, jsConfig)
    .then((result) => {
      t.deepEqual(result.config, {
        foo: true,
      });
      t.is(result.filepath, jsConfig);
    });
});
