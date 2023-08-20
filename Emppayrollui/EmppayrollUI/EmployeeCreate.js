class EmployeePayrollData {
    get id() {
        return this._id;
    }
    set id(id) {
        this._id = id;
    }
    get name() {
        return this._name;
    }
    set name(name) {
        let nameRegex = RegExp("^[A-Z]{1}[a-z]{2,20}$");
        if (nameRegex.test(name)) {
            this._name = name;
        }
        else {
            throw "Invalid name"
        }
    }
    get profilePic() {
        return this._profilePic;
    }
    set profilePic(profilePic) {
        this._profilePic = profilePic;
    }
    get gender() {
        return this._gender;
    }
    set gender(gender) {
        this._gender = gender;
    }
    get department() {
        return this._department;
    }
    set department(department) {
        this._department = department;
    }
    get salary() {
        return this._salary;
    }
    set salary(salary) {
        this._salary = salary;
    }
    get note() {
        return this._note;
    }
    set note(note) {
        this._note = note;
    }
    get startDate() {
        return this._startDate;
    }
    set startDate(startDate) {
        this._startDate = startDate;
    }
    toString() {
        const options = { year: "numaric", month: "long", day: "numaric" };
        const empDate = !this.startDate ? "undefined" : this.startDate;
        return "name : " + this.name + ", gender : " + this.gender + ", profilePic : " + this.profilePic + ", department : " + this.department + ", salary : " + this.salary + ", startDate : " + empDate + ", note : " + this.note;
    }
}
window.addEventListener("DOMContentLoaded", (event) => {
    const employeePayrollJson = localStorage.getItem('editEmp');
    if (employeePayrollJson) {
        isUpdate = employeePayrollJson ? true : false;
        if (!isUpdate) return;
        employeePayrollObj = JSON.parse(employeePayrollJson);
        setForm();
    } else {
        const name = document.querySelector("#name");
        const textError = document.querySelector(".text-error");
        name.addEventListener("input", function () {
            if (name.value && name.value.length == 0) {
                textError.textContent = "";
                return;
            }
            try {
                (new EmployeePayrollData()).name = name.value;
                textError.textContent = "";
            }
            catch (exception) {
                textError.textContent = exception;
            }
        });
        const salary = document.querySelector("#salary");
        const output = document.querySelector(".salary-output");
        output.textContent = salary.value;
        salary.addEventListener("input", function () {
            output.textContent = salary.value;
        });
    }
});
const save = () => {
    try {
        let employeePayrollData = createEmployeePayroll();
        createAndUpdateStorage(employeePayrollData);
    }
    catch (exception) {
        return;
    }
}
function createAndUpdateStorage(employeePayrollData) {
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    let empDataEdidted = localStorage.getItem("editEmp");
    if (empDataEdidted) {
        empDataEdidted = JSON.parse(empDataEdidted);
        let empPayrollData = employeePayrollList.filter(empData => empData._id != empDataEdidted._id);
        employeePayrollList = empPayrollData;
    }

    if (employeePayrollList != undefined) {
        employeePayrollList.push(employeePayrollData);
    }
    else {
        employeePayrollList = [employeePayrollData];
    }
    alert(employeePayrollList.toString());
    localStorage.setItem('editEmp', JSON.stringify(employeePayrollData));
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
    console.log("Before redirection");
    window.location.replace("./EmployeePayrollList.html");

    console.log("After redirection");

}
const createEmployeePayroll = () => {
    let employeePayrollData = new EmployeePayrollData();
    try {
        employeePayrollData.name = getInputValueById("#name");
    }
    catch (exception) {
        throw exception;
    }
    employeePayrollData.id = createNewEmployeeId();
    employeePayrollData.profilePic = getSelectedValues("[name=profile]").pop();
    employeePayrollData.gender = getSelectedValues("[name=gender]").pop();
    employeePayrollData.department = getSelectedValues("[name=department]");
    employeePayrollData.salary = getInputValueById("#salary");
    employeePayrollData.note = getInputValueById("#notes");
    let date = getInputValueById("#day") + " " + getInputValueById("#month") + " " + getInputValueById("#year");
    employeePayrollData.startDate = date;
    return employeePayrollData;
}
const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let selItems = [];
    allItems.forEach(item => {
        if (item.checked) {
            selItems.push(item.value);
        }
    });
    return selItems;
}
const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}
const getInputValue = (id) => {
    let value = document.getElementById(id).value;
    return value;
}

const createNewEmployeeId = () => {
    let empID = localStorage.getItem("EmployeeID");
    empID = !empID ? "1" : (parseInt(empID) + 1).toString();
    localStorage.setItem("EmployeeID", empID);
    return empID;
}


const setForm = () => {
    setValue('#name', employeePayrollObj._name);
    setSelectedValues('[name=profile]', employeePayrollObj._profilePic);
    setSelectedValues('[name=gender]', employeePayrollObj._gender);
    setSelectedValues('[name=department]', employeePayrollObj._department);
    setValue('#salary', employeePayrollObj._salary);
    setTextValue('.salary-output', employeePayrollObj._salary)
    setValue('#notes', employeePayrollObj._notes);
    /* let date = stringifyDate(employeePayrollObj._startDate).split(" ");
    setValue('#day',date[0]);
    setValue('#month',date[1]);
    setValue('#year',date[2]); */
}


const setSelectedValues = (propertyValue, value) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        if (Array.isArray(value)) {
            if (value.includes(item.value)) {
                item.checked = true;
            }
        }
        else if (item.value === value) {
            item.checked = true;
        }
    });
}

const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.checked = false;
    })
}

const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}

