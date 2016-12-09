import test from 'ava';
import { join } from 'path';
import cosmiconfig from '..';

let loadConfig;

test.before((t) => {
  loadConfig = cosmiconfig().load;
});

test('defined JSON config path', (t) => {
  const jsonConfig = join(__dirname, 'fixtures/foo.json');
  
  return loadConfig(null, jsonConfig).then((result) => {
    t.deepEqual(result.config, {
      foo: true,
    });
    t.is(result.filepath, jsonConfig);
  });
});

test('defined YAML config path', (t) => {
  const yamlConfig = join(__dirname, 'fixtures/foo.yaml');
  
  return loadConfig(null, yamlConfig).then((result) => {
    t.deepEqual(result.config, {
      foo: true,
    });
    t.is(result.filepath, yamlConfig);
  });
});

test('defined JS config path', (t) => {
  const jsConfig = join(__dirname, 'fixtures/foo.js');
  
  return loadConfig(null, jsConfig).then((result) => {
    t.deepEqual(result.config, {
      foo: true,
    });
    t.is(result.filepath, jsConfig);
  });
});

test('defined modulized JS config path', (t) => {
  const jsConfig = join(__dirname, 'fixtures/foo-module.js');
  
  return loadConfig(null, jsConfig).then((result) => {
    t.deepEqual(result.config, {
      foo: true,
    });
    t.is(result.filepath, jsConfig);
  });
});
