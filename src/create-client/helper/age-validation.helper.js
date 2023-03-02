const validateAge = async (birthday) => {
    const [day, month, year] = birthday.split('/');
    const birthdayDate = new Date(+year, +month - 1, +day);
    const actualDate = new Date();
    const age = actualDate.getFullYear() - birthdayDate.getFullYear();
    let isValid = (age >= 18 && age <= 65) ? true : false;
    return {
        isValid,
        age
    }
}

module.exports = { validateAge };
