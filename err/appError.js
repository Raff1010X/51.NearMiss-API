/**
 * Custom error class
 */
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor); // this is to be able to catch the error in the catch block
    }
}

module.exports = AppError;

//** Export handleErrors functions
//** JWT error handling
module.exports.handleJsonWebTokenError = () => new AppError('Problem z logowaniem! Zaloguj się ponownie.', 401);
module.exports.handleTokenExpiredError = () => new AppError('Sesja wygasła! Zaloguj się ponownie.', 401);

//** CSRF errors handling
module.exports.handleBadCSRFtokenError = () =>
    new AppError('Błąd CSRF! Włącz obsługę COOKIES dla tej strony oraz zrestartuj aplikację.', 403);

//** Database errors handling
module.exports.handleDuplicateData = () => new AppError('Błąd zapisu danych!', 400);

//** Unhandled errors
module.exports.handleErrors = () => new AppError('Coś poszło nie tak!', 500);

//** Authentication error handling
module.exports.serverErr500 = () => new AppError('Błąd serwera!', 500);
module.exports.serverErr404 = () => new AppError('Błąd serwera!', 404);
module.exports.loginError = () => new AppError('Email lub hasło są nieprawidłowe, lub użytkownik nie istnieje.', 400);
module.exports.loginExpired = () => new AppError('Nie jesteś zalogowany! Zaloguj się aby uzyskać dostęp.', 401);
module.exports.loginAgain = () => new AppError('Błąd uwierzytelnia! Zaloguj się ponownie.', 401);
module.exports.userNotFound = () => new AppError('Błąd uwierzytelnia! Nie znaleziono użytkownika!', 404);
module.exports.userNotActive = () => new AppError('Konto użytkownika nie zostało aktywowane!', 401);
module.exports.notAutorized = () => new AppError('Brak uprawnień do tych zasobów!', 403);
module.exports.notToChange = () => new AppError('Nie możesz edytować wpisów innych użytkowników!', 401);
module.exports.resetPassword = () =>
    new AppError(
        'Użytkownik o takim adresie email jest już zarejestrowany. Skorzystaj z opcji resetowania hasła, lub podaj inny email.',
        400
    );
module.exports.sendMail = () => new AppError('Wystąpił błąd podczas wysyłania maila. Spróbuj ponownie później!', 500);
module.exports.tokenExpired = () => new AppError('Błąd uwierzytelnia! Twoje tokeny wygasły!', 401);
module.exports.tokenNotFound = () => new AppError('Ten link do aktywacji był już użyty!', 404);
module.exports.linkExpired = () => new AppError('Link do aktywacji wygasł!', 400);
module.exports.urlNotFound = (req) => new AppError(`Not found: ${req.originalUrl}`, 404);

//** File errors handling
module.exports.writeError = () => new AppError('Błąd zapisu pliku.', 400);
module.exports.notBase64 = () => new AppError('Błędny format pliku.', 400);
