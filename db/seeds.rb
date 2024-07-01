Booking.delete_all
Slot.delete_all
User.delete_all

User.create!(name: "Coach John", type: "Coach", phone_number: "123-456-7890")
User.create!(name: "Coach Jane", type: "Coach", phone_number: "123-456-7891")
User.create!(name: "Student Alice", type: "Student", phone_number: "123-456-7892")
User.create!(name: "Student Bob", type: "Student", phone_number: "123-456-7893")

puts "Seeding complete"
