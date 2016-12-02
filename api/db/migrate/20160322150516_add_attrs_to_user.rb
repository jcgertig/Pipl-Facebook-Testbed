class AddAttrsToUser < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :name, :string, default: ''
    add_column :users, :profile_image, :string, default: ''
    add_column :users, :provider, :string, default: ''
    add_column :users, :uid, :string, default: ''
  end
end
