/**
 * Localization class.
 */
export class Ui {
  /**
   * Gets saved selected album from local storage.
   *
   * @returns {string}
   *   Album Id.
   */
  public static getLocalSelectedAlbum(): string {
    return localStorage.getItem('selectedAlbum') ?? ''
  }
}
