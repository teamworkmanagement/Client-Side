const MIN_RANK = "00000000000000000000000000000000000000000000000000";
const MAX_RANK = "zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz";
const BASE_STR = "0123456789abcdefghijklmnopqrstuvwxyz";

//output{0: a>=b not valid, string: found, false: notfound}
export const FindRankBetween = (str1, str2, checkFullSlot = false) => {
  const a = str1.toLocaleLowerCase();
  const b = str2.toLocaleLowerCase();
  if (a >= b) {
    return {
      rank: 0,
      isOutOfSlot: false,
    };
  }
  var res = ""; //rank between result
  var index = 0;
  var isFound = false;
  while (true) {
    if (a.length - 1 < index && b.length - 1 < index) {
      //khi đã đi qua hết cà 2 chuỗi
      if (res === a) {
        res += FindLetterBetween("0", "z");
        isFound = true;
      }
      if (res === b) {
        //NOT FOUND nên không giải quyết nữa
      }
      break;
    }

    if (a.length - 1 < index) {
      //khi đã đi qua hết chuỗi a
      if (b[index] === "0") {
        // ký tự của b tại index là 0 => không có ký tự nhỏ hơn
        res += "0";
        index++;
        continue;
      }
      res += FindLetterBetween("0", b[index]); //tìm được ký tự nhỏ hơn

      isFound = true;
      break;
    }

    if (b.length - 1 < index) {
      //khi đã đi qua hết chuỗi b
      if (a[index] === "z") {
        // ký tự tại index là z => không có ký tự lớn hơn
        res += "z";
        index++;
        continue;
      }
      if (a[index] === "y") {
        res += "z";
      } else {
        res += FindLetterBetween(a[index], "z"); //tìm được ký tự lớn hơn
      }
      isFound = true;
      break;
    }

    if (a[index] === b[index]) {
      res += a[index];
      index++;
      continue;
    }
    if (a[index] < b[index]) {
      const betweenLetter = FindLetterBetween(a[index], b[index]);
      if (betweenLetter !== a[index] && betweenLetter !== b[index]) {
        res += betweenLetter;
        isFound = true;
        break;
      }
      res += betweenLetter;
      index++;
      continue;
    }

    //trường hợp a[index]>b[index]
    res += a[index];
    index++;
  }

  if (!isFound) {
    return {
      rank: false,
      isOutOfSlot: false,
    };
  } else {
    res = formatAgain(res);

    if (a < res && res < b) {
      let isFull1 = false;
      let isFull2 = false;
      if (checkFullSlot) {
        isFull1 = FindLetterBetween(a, res, false);
        isFull2 = FindLetterBetween(res, b, false);
      }
      const isFull = isFull1.isOutOfSlot || isFull2.isOutOfSlot;

      return {
        rank: res,
        isOutOfSlot: isFull,
      };
    } else {
      console.log("found but wrong" + a + "-" + b + "-res:" + res);
      return {
        rank: false,
        isOutOfSlot: false,
      };
    }
  }
};

export const FindNextRank = (str) => {
  const nextRank = FindRankBetween(str, MAX_RANK, false);
  return nextRank.rank;
};
export const FindPreRank = (str) => {
  const preRank = FindRankBetween(MIN_RANK, str, false);
  return preRank.rank;
};
export const genNewRank = () => {
  const newRank = FindRankBetween(MIN_RANK, MAX_RANK);
  return newRank.rank;
};

function FindLetterBetween(letterA, letterB) {
  const index1 = BASE_STR.indexOf(letterA);
  const index2 = BASE_STR.indexOf(letterB);
  return BASE_STR[Math.floor((index1 + index2) / 2)];
}

//fill đủ chiều dài là 6, str có length quá nhỏ sẽ dễ hết slot
function formatAgain(res) {
  if (res.length < 6) {
    const missingNumber = 6 - res.length;
    for (let i = 0; i < missingNumber; i++) {
      res += BASE_STR[getRandomBetween(10, 20)];
    }
  }

  //khi ký tự cuối bằng 0, thêm i để tránh trường hợp hết slot trong tương lai
  if (res[res.length - 1] === "0") {
    res += "i";
  }
  return res;
}

function getRandomBetween(min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

//rebalance list rank when rank value is over size or out of available slots
//eslint-disable-next-line
export const CreateNewListRank = (n) => {
  var newRanks = [MIN_RANK, MAX_RANK];
  var createDone = false;
  while (!createDone) {
    //khi chưa tạo đủ số lượng n ranks thì vẫn tiếp tục lặp
    var saveNewRanks = [];
    for (let i = 0; i < newRanks.length - 1; i++) {
      saveNewRanks.push(newRanks[i]);
      if (!createDone) {
        const newRank = FindRankBetween(newRanks[i], newRanks[i + 1], false);
        saveNewRanks.push(newRank.rank);
      }
      if (newRanks.length + i - 1 === n) {
        //đã tạo đủ
        createDone = true;
      }
    }
    newRanks = [...saveNewRanks, MAX_RANK];
  }

  //remove min_rank && maxrank flags
  return newRanks.slice(1, newRanks.length - 1);
}