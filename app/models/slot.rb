class Slot < ApplicationRecord
  belongs_to :coach
  has_one :booking
  has_one :student, through: :booking
end
