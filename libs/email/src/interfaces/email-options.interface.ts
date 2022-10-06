export interface EmailOptions {
  service: string;
  user: string;
  password: string;
}

export interface EmailOptionsFactory {
  createEmailOptions(): EmailOptions;
}
