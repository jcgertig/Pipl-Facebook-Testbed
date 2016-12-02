class AddTokenToUser < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :fb_token, :string, default: '', null: false
    add_column :users, :token_expires, :datetime
  end
end
