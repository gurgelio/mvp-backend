class RenameEncryptedPasswordToPasswordDigestOnUsers < ActiveRecord::Migration[7.2]
  def change
    rename_column :users, :encrypted_password, :password_digest
    remove_column :users, :reset_password_sent_at
    remove_column :users, :reset_password_token
  end
end
