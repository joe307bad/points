const Utilities = {
    isEmptyObject(object: {}): boolean {
        return Object.keys(object).length === 0
    },
    isJSON(json: string) {
        try {
            JSON.parse(json);
        } catch (e) {
            return false;
        }
        return true;
    }
}

export default Utilities;