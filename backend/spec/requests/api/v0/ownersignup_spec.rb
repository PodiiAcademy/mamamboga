RSpec.describe  'OwnersRegistration', type: :request do
    let(:headers) { { HTTP_ACCEPT: 'application/json' } }

context 'with valid credentials' do
  it 'returns a owner and token' do
    post '/api/v0/Owner/admin_auth', params: { first_name: "okoth", second_name: "kongo",
      email: 'example@craftacademy.se', password: 'password123',
      password_confirmation: 'password123'
    }, headers: headers

    expect(response_json['status']).to eq 'success'
    expect(response.status).to eq 200
  end
end
  context 'returns an error message when user submits' do
      it 'non-matching password confirmation' do
        post '/api/v0/Owner/admin_auth', params: {
          email: 'okothkongo@gmail.com', password: '1eee2333',
          password_confirmation: 'password'
        }, headers: headers

        expect(response_json['errors']['password_confirmation'])
          .to eq ["doesn't match Password"]
        expect(response.status).to eq 422
      end

      it 'an invalid email address' do
        post '/api/v0/Owner/admin_auth', params: {
          email: 'Gijoe', password: 'password',
          password_confirmation: 'password'
        }, headers: headers
        expect(response_json['errors']['email']).to eq ['is not an email']
        expect(response.status).to eq 422

      end

      it 'an already registered email' do
        FactoryBot.create(:owner, email: 'okothkongo@gmail.com',
                                  password: 'password',
                                  password_confirmation: 'password')

        post '/api/v0/Owner/admin_auth', params: {
          email: 'okothkongo@gmail.com', password: 'strongpass',
          password_confirmation: 'strongpass'
        }, headers: headers

        expect(response_json['errors']['email']).to eq ['has already been taken']
        expect(response.status).to eq 422
      end
  end
end