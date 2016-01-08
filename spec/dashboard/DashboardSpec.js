var sinon = require('sinon'),
ajax =      require('basic-ajax'),
endpoints = require('../../src/js/api-endpoints'),
adminurls = require('../../src/js/admin-urls'),
browser =   require('../../src/js/browser'),
cookies =   require('../../src/js/cookies')

describe('Dashboard', function () {
  var Dashboard = require('../../src/js/models/Dashboard'),
  dashboard,
  stubbedApi

  beforeEach(function () {
    dashboard = new Dashboard()

    function fakeResolved(value) {
      return {
        then: function(success, error) {
          success({
            'status': 200,
            'json': {
            }
          })
        }
      }
    }

    stubbedApi = sinon.stub(ajax, 'getJson')
    stubbedApi.returns(fakeResolved())

    dashboard.init()
  })

  afterEach(function () {
    ajax.getJson.restore()
  })

  it('should retrieve service providers from api', function() {
    var apiCalledWithExpectedArgs = stubbedApi.withArgs(endpoints.getServiceProviders).calledOnce
    expect(apiCalledWithExpectedArgs).toBeTruthy()
  })
})
