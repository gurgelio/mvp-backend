# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Students', type: :request do
  let(:teacher) { create :teacher }
  let!(:student1) { create :student }
  let(:new_student) { build :student, teacher: teacher }

  describe 'unauthenticated' do
    it 'GET /' do
      get '/students'

      expect(response.body).to include(student1.email)
    end

    it 'POST /' do
      post '/students', params: { student: new_student }

      expect(response.code).to eq('302')
    end
  end

  describe 'authenticated admin' do
    let(:admin) { create :user, :admin }
    let(:headers) { Devise::JWT::TestHelpers.auth_headers({ 'Accept' => 'application/json' }, admin) }

    it 'POST /' do
      post '/students', params: { student: new_student.as_json.compact }, headers: headers
      expect(response.code).to eq('201')
    end
  end
end
