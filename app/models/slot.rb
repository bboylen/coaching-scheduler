class Slot < ApplicationRecord
  belongs_to :coach
  has_one :booking
  has_one :student, through: :booking

  scope :available, -> { left_joins(:booking).where(bookings: { id: nil }) }
end
