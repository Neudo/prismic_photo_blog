export const dateConverter = (date: string): string => {
    const dateFormat = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    };

    return new Intl.DateTimeFormat('fr-FR', options).format(dateFormat);
}
