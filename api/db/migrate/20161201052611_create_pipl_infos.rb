class CreatePiplInfos < ActiveRecord::Migration[5.0]
  def change
    create_table :pipl_infos do |t|
      t.json :base_data
      t.string :fb_id

      t.timestamps
    end
  end
end
