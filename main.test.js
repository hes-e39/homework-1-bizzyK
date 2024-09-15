import fetchColors from './index';

test('no filters provided should return an empty array', async () => {
  const res = await fetchColors({});
  expect(res.length).toEqual(0);
});

test('non-existent color name should return an empty array', async () => {
  const res = await fetchColors({
    name: 'NonExistentColor',
  });
  expect(res.length).toEqual(0);
});

test('non-existent complementary hex should return an empty array', async () => {
  const res = await fetchColors({
    compHex: 'ZZZZZZ', // Invalid hex code
  });
  expect(res.length).toEqual(0);
});

test('valid color but with non-existent complementary name should return an empty array', async () => {
  const res = await fetchColors({
    compName: 'NonExistentComplementaryColor',
  });
  expect(res.length).toEqual(0);
});


test('for hex EFDECD returns Almond', async () => {
  const res = await fetchColors({
    hex: 'EFDECD',
  });

  expect(res.length).toEqual(1);
  expect(res[0].name).toEqual('Almond');
});

test('for name periwinkle returns Periwinkle', async () => {
  const res = await fetchColors({
    name: 'periwinkle',
  });

  expect(res.length).toEqual(1);
  expect(res[0].hex).toEqual('C5D0E6');
});

test('for compName White Ice returns Sea Green', async () => {
  const res = await fetchColors({
    compName: 'white Ice',
  });

  expect(res.length).toEqual(1);
  expect(res[0].hex).toEqual('9FE2BF');
});

test('for compHex 627BA5 returns Shadow', async () => {
  const res = await fetchColors({
    compHex: '627BA5',
  });

  expect(res.length).toEqual(1);
  expect(res[0].hex).toEqual('8A795D');
});

test('for compName Black returns Black and Shadow', async () => {
  const res = await fetchColors({
    compName: 'Black',
  });

  expect(res.length).toEqual(2);
  expect(res.find((c) => c.hex === '8A795D')).not.toBeUndefined();
  expect(res.find((c) => c.hex === '000000')).not.toBeUndefined();
});

test('for compHex FFFFFF the expected 14 colors', async () => {
  const res = await fetchColors({
    compHex: 'FFFFFF',
  });

  const expected = [
    'EFDECD',
    'FDD9B5',
    'FAE7B5',
    'FFAACC',
    'FFBCD9',
    'FCB4D5',
    'FDBCB4',
    'FFCFAB',
    'C5D0E6',
    'FDDDE6',
    'ECEABE',
    'EBC7DF',
    'DBD7D2',
    'FFFFFF',
  ].sort();



  const received = res.map((r) => r.hex).sort();

  expected.forEach((e, i) => {
    expect(received[i]).toBe(e);
  });
});
