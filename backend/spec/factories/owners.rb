FactoryBot.define do
  factory :owner do
    first_name { 'Okoth' }
    last_name { 'Kongo' }
    email { 'kongo@example.com' }
    password { 'Wall#1234' }
    password_confirmation { 'Wall#1234' }
  end
end
