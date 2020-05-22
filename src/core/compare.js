class Compares {
    isEqual = (array1, array2) => {
        try {
            return array1.length === array2.length && array1.sort().every(function (value, index) { return value === array2.sort()[index] });
        }
        catch{ }
    }
}

var Compare = new Compares();
export default Compare;