class Booking < ApplicationRecord
  belongs_to :slot
  belongs_to :student
  has_one :coach, through: :slot
end
