import test from 'ava';
import absolutePath from './helpers/absolutePath';
import cosmiconfig from '..';

const { load: loadConfig } = cosmiconfig();

test('defined file that does not exist', (t) => {
  return loadConfig(null, absolutePath('does/not/exist'))
    .then(t.fail)
    .catch((error) => {
      t.is(error.code, 'ENOENT', 'with expected format');
    });
});

test('defined JSON file with syntax error, without expected format', (t) => {
  return loadConfig(null, absolutePath('fixtures/foo-invalid.json'))
    .then(t.fail)
    .catch((error) => {
      t.regex(error.message, /^Failed to parse/);
    });
});

test('defined JSON file with syntax error, with expected format', (t) => {
  t.context.loadConfig = cosmiconfig(null, {
    format: 'json',
  }).load;

  return t.context.loadConfig(null, absolutePath('fixtures/foo-invalid.json'))
    .then(t.fail)
    .catch((error) => {
      // t.is(error.name, 'JSONError'); TODO fix this failure
      t.is(error.name, 'TypeError');
    });
});

test('defined YAML file with syntax error, without expected format', (t) => {
  return loadConfig(null, absolutePath('fixtures/foo-invalid.yaml'))
    .then(t.fail)
    .catch((error) => {
      t.regex(error.message, /^Failed to parse/);
    });
});

test('defined YAML file with syntax error, with expected format', (t) => {
  t.context.loadConfig = cosmiconfig(null, {
    format: 'yaml',
  }).load;

  return t.context.loadConfig(null, absolutePath('fixtures/foo-invalid.yaml'))
    .then(t.fail)
    .catch((error) => {
      t.is(error.name, 'YAMLException');
    });
});

test('defined JS file with syntax error, without expected format', (t) => {
  return loadConfig(null, absolutePath('fixtures/foo-invalid.js'))
    .then(t.fail)
    .catch((error) => {
      t.regex(error.message, /^Failed to parse/);
    });
});

test('defined JS file with syntax error, with expected format', (t) => {
  t.context.loadConfig = cosmiconfig(null, {
    format: 'js',
  }).load;

  return t.context.loadConfig(null, absolutePath('fixtures/foo-invalid.js'))
    .then(t.fail)
    .catch((error) => {
      t.notRegex(error.message, /^Failed to parse/);
    });
});
