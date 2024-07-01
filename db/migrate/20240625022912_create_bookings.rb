class CreateBookings < ActiveRecord::Migration[7.1]
  def change
    create_table :bookings do |t|
      t.references :slot, null: false, foreign_key: true
      t.references :student, null: false, foreign_key: { to_table: :users }
      t.boolean :completed, default: false, null: false
      t.integer :satisfaction_rating
      t.text :notes

      t.timestamps
    end
  end
end
