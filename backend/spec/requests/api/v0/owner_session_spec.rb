RSpec.describe 'Sessions', type: :request do
  let(:owner) { FactoryBot.create(:owner) }
  let(:headers) { { HTTP_ACCEPT: 'application/json' } }

  describe 'POST /api/v0/Owner/admin_auth/sign_in' do
    it 'valid credentials returns owner' do
      post '/api/v0/Owner/admin_auth/sign_in', params: {
        email: owner.email, password: owner.password
      }, headers: headers

      expected_response = {
        'data' => {
          'id' => owner.id, 'uid' => owner.email, 'email' => owner.email,
          'provider' => 'email', 'first_name' => owner.first_name, 'last_name' =>owner.last_name,
          'allow_password_change'=>false
        }
      }

      expect(response_json).to eq expected_response
    end
    it 'invalid password returns error message' do
      post '/api/v0/Owner/admin_auth/sign_in', params: {
        email: owner.email, password: 'invalid password'
      }, headers: headers

      expect(response_json['errors'])
        .to eq ['Invalid login credentials. Please try again.']
      expect(response.status).to eq 401
    end
    it 'invalid email returns error message' do
      post '/api/v0/Owner/admin_auth/sign_in', params: {
        email: 'unclebob test', password: owner.password
      }, headers: headers

      expect(response_json['errors'])
        .to eq ['Invalid login credentials. Please try again.']
      expect(response.status).to eq 401
    end
  end
end