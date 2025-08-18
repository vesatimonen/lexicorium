async function dbReadFile(fileName, language) {
    try {
        /* Read file */
        let response = await fetch(fileName); // Get file info
        let text     = await response.text(); // Get file data

        /* Split text to array */
        let lines = text.split("\n");

        /* Trim all strings */
        let trimmed = lines.map(line => line.trim());

        /* Filter away empty strings */
        let filtered = trimmed.filter(line => line !== "");

        /* Convert values to uppercase */
        let uppered = filtered.map(str => str.toUpperCase());

        /* Remove some chatacters based on language */
        let replaced = uppered;
        switch (language) {
            case "ITA":
                replaced = uppered.map(str => str.replace('\'', ''));
                break;
            case "FRA":
                replaced = uppered.map(str => str.replace('-', ''));
                break;
        }

        /* Convert array to set (faster) */
        let stringSet = new Set(replaced);

        return stringSet;
    } catch (error) {
        console.error("Error loading file:", error);
    }
}
