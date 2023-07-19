class PersistPlaylistDTO {
    constructor(data) {
        this.name = data.name;
    }

    validate() {
        if (this.validateName())
            return true;
        else
            throw new Error("name is invalid");
    }

    validateName() {
        if (this.name == null || this.name == "") return false;
        return true;
    }

    getName() {
        return this.name;
    }

    setName(name) {
        this.name = name;
    }

    
}

module.exports = PersistPlaylistDTO;
