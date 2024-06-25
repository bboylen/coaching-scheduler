class Coach < User
  has_many :slots
  has_many :bookings, through: :slots

  def available_slots
    slots.where(booking: nil)
  end
end
