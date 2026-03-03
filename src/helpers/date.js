/**
 * Calculate age from a birthdate string.
 * @param {string} birthdateStr - Date string (e.g. "1995-08-21", "08/21/1995")
 * @returns {number} age in years
 */
export function calculateAge(birthdateStr) {
    const birthDate = new Date(birthdateStr);

    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();

    const hasHadBirthdayThisYear =
        today.getMonth() > birthDate.getMonth() ||
        (today.getMonth() === birthDate.getMonth() &&
            today.getDate() >= birthDate.getDate());

    if (!hasHadBirthdayThisYear) {
        age--;
    }

    return age;
}