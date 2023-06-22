class EmployeePayrollData{
    get id() { return this._id; }
    set id(value){
        this._id = value;
    }
    get name() { return this._name; }
    set name(name){
        let nameRegex = RegExp('^[A-Z]{1}[A-Z,a-z]{2,}$');
        if (nameRegex.test(name))
            this._name = name;
        else throw "Invalid Name";
    }
    get profilePic() { return this._profilePic; }
    set profilePic(profilePic){
        this._profilePic = profilePic;
    }
    get gender() { return this._gender; }
    set gender(gender){
        this._gender = gender;
    }
    get department() { return this._department; }
    set department(department){
        this._department = department;
    }
    get salary() { return this._salary; }
    set salary(salary){
        this._salary = salary;
    }
    get notes() { return this._notes; }
    set notes(notes){
        this._notes = notes;
    }
    get startDate() { return this._startDate; }
    set startDate(startDate){
        this._startDate = startDate;
    }

    toString(){
        return "Id: "+this.id+", Name: "+this.name+", Gender: "+this.gender+", ProfilePic: "+this.profilePic+", Department: "+this.department
        +", Salary: "+this.salary+", StartDate: "+this.startDate+", Notes: "+this.notes;
    }
}