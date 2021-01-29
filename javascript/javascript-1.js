var ar1 = [
  ["a", "b"],
  ["a", "c"],

  ["g", "w"],
  ["g", "x"],
  ["g", "y"],
  ["g", "z"],

  ["d", "e"],
];

var ar2 = [
  ["g", "w"],
  ["g", "x"],
  ["a", "b"],
  ["a", "c"],
  ["d", "e"],
];

function array2hash(a) {
  return a.reduce(function (p, e) {
    p[e] = true;
    return p;
  }, {});
}

function maxItemAssociation(aOuter) {
  var max = 0;
  var list = [];
  var lastName = undefined;
  var hTmp = {};
  aOuter.forEach(function (aInner) {
    aInner.forEach(function (n) {
      if (hTmp[n] === undefined) {
        hTmp[n] = { cnt: 0, list: [] };
      }
      if (lastName === undefined) {
        lastName = n;
      }
      hTmp[n].cnt++;
      hTmp[n].list.push(aInner);
      if (hTmp[n].cnt > max) {
        max = hTmp[n].cnt;
        list = hTmp[n].list;
      } else if (hTmp[n].cnt === max && n < lastName) {
        list = hTmp[n].list;
        lastName = n;
      }
    });
  });
  return Object.keys(
    array2hash(
      list.reduce((prev, a) => {
        Array.prototype.push.apply(prev, a);
        return prev;
      }, [])
    )
  );
}

console.log(maxItemAssociation(ar1));
console.log(maxItemAssociation(ar2));
