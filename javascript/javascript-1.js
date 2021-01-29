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
  var h = aOuter.reduce(function (prev, aInner) {
    aInner.forEach(function (n) {
      if (prev[n] === undefined) {
        prev[n] = { cnt: 0, list: [] };
      }
      if (lastName === undefined) {
        lastName = n;
      }
      prev[n].cnt++;
      prev[n].list.push(aInner);
      if (prev[n].cnt > max) {
        max = prev[n].cnt;
        list = prev[n].list;
      } else if (prev[n].cnt === max && n < lastName) {
        list = prev[n].list;
        lastName = n;
      }
    });
    return prev;
  }, {});
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

