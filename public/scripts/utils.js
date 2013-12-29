 Array.prototype.indexOfField = function (propertyName, value) {
        for (var i = 0; i < this.length; i++)
            if (this[i][propertyName] === value)
                return i;
        return -1;
    }