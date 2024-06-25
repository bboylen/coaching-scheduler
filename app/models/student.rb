class Student < User
  has_many :bookings
  has_many :slots, through: :bookings

  validates :type, inclusion: { in: ['Student'] }
end
