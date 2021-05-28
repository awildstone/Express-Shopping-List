class NotFound extends Error {
    constructor(msg, status) {
        super();
        this.msg = msg;
        this.status = status;
        console.error(this.stack);
    }
}

class EmptyInput extends Error {
    constructor(msg, status) {
        super();
        this.msg = msg;
        this.status = status;
        console.error(this.stack);
    }
}

class EmptyName extends Error {
    constructor(msg, status) {
        super();
        this.msg = msg;
        this.status = status;
        console.error(this.stack);
    }
}

class EmptyPrice extends Error {
    constructor(msg, status) {
        super();
        this.msg = msg;
        this.status = status;
        console.error(this.stack);
    }
}

class DuplicateValue extends Error {
    constructor(msg, status) {
        super();
        this.msg = msg;
        this.status = status;
        console.error(this.stack);
    }
}

module.exports = { NotFound, EmptyInput, EmptyName, EmptyPrice, DuplicateValue }