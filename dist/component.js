define('nodes/components/driver-scaleway/component', ['exports', 'shared/mixins/node-driver'], function (exports, _nodeDriver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var LAYOUT = "PHNlY3Rpb24gY2xhc3M9Imhvcml6b250YWwtZm9ybSI+CiAge3sjYWNjb3JkaW9uLWxpc3Qgc2hvd0V4cGFuZEFsbD1mYWxzZSBhcyB8IGFsIGV4cGFuZEZuIHx9fQogICAge3shLS0gVGhpcyBsaW5lIHNob3dzIHRoZSBkcml2ZXIgdGl0bGUgd2hpY2ggeW91IGRvbid0IGhhdmUgdG8gY2hhbmdlIGl0IC0tfX0KICAgIDxkaXYgY2xhc3M9Im92ZXItaHIgbWItMjAiPjxzcGFuPnt7ZHJpdmVyT3B0aW9uc1RpdGxlfX08L3NwYW4+PC9kaXY+CgogICAge3shLS0gQW4gZXhhbXBsZSBpbnB1dCBvcHRpb24gLS19fQogICAgPGRpdiBjbGFzcz0icm93IGJveCBtdC0yMCI+CiAgICAgIDxoND5BUEkgQWNjZXNzPC9oND4KICAgICAgPGRpdiBjbGFzcz0icm93Ij4KICAgICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi0yIGNvbC1pbmxpbmUiPgogICAgICAgICAgPGxhYmVsPk9yZ2FuaXphdGlvbjwvbGFiZWw+CiAgICAgICAgPC9kaXY+CiAgICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tNCI+CiAgICAgICAgICB7e2lucHV0IHZhbHVlPWNvbmZpZy5vcmdhbml6YXRpb24gY2xhc3NOYW1lcz0iZm9ybS1jb250cm9sIiBwbGFjZWhvbGRlcj0iU2NhbGV3YXkgT3JnYW5pemF0aW9uIElEIn19CiAgICAgICAgPC9kaXY+CgogICAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTIgY29sLWlubGluZSI+CiAgICAgICAgICA8bGFiZWw+VG9rZW48L2xhYmVsPgogICAgICAgIDwvZGl2PgogICAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTQiPgogICAgICAgICAge3tpbnB1dCB2YWx1ZT1jb25maWcudG9rZW4gY2xhc3NOYW1lcz0iZm9ybS1jb250cm9sIiBwbGFjZWhvbGRlcj0iU2NhbGV3YXkgQVBJIFRva2VuIn19CiAgICAgICAgPC9kaXY+CiAgICAgIDwvZGl2PgogICAgPC9kaXY+CgogICAgPGRpdiBjbGFzcz0icm93IGJveCBtdC0yMCI+CiAgICAgIDxoND5JbnN0YW5jZTwvaDQ+CiAgICAgIDxkaXYgY2xhc3M9InJvdyI+CiAgICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tMiBjb2wtaW5saW5lIj4KICAgICAgICAgIDxsYWJlbD5JbnN0YW5jZSBOYW1lPC9sYWJlbD4KICAgICAgICA8L2Rpdj4KICAgICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi00Ij4KICAgICAgICAgIHt7aW5wdXQgdmFsdWU9Y29uZmlnLm5hbWUgY2xhc3NOYW1lcz0iZm9ybS1jb250cm9sIiBwbGFjZWhvbGRlcj0iT3B0aW9uYWxseSBzcGVjaWZ5IHRoZSBpbnN0YW5jZSBuYW1lIn19CiAgICAgICAgPC9kaXY+CgogICAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTIgY29sLWlubGluZSI+CiAgICAgICAgICA8bGFiZWw+UmVnaW9uPC9sYWJlbD4KICAgICAgICA8L2Rpdj4KICAgICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi00Ij4KICAgICAgICAgIHt7aW5wdXQgdmFsdWU9Y29uZmlnLnJlZ2lvbiBjbGFzc05hbWVzPSJmb3JtLWNvbnRyb2wiIHBsYWNlaG9sZGVyPSJTcGVjaWZ5IHRoZSBsb2NhdGlvbiAocGFyMSxhbXMxKSJ9fQogICAgICAgIDwvZGl2PgogICAgICA8L2Rpdj4KICAgICAgPGRpdiBjbGFzcz0icm93Ij4KICAgICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi0yIGNvbC1pbmxpbmUiPgogICAgICAgICAgPGxhYmVsPkltYWdlPC9sYWJlbD4KICAgICAgICA8L2Rpdj4KICAgICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi00Ij4KICAgICAgICAgIHt7aW5wdXQgdmFsdWU9Y29uZmlnLmltYWdlIGNsYXNzTmFtZXM9ImZvcm0tY29udHJvbCIgcGxhY2Vob2xkZXI9IlNwZWNpZnkgdGhlIGltYWdlIn19CiAgICAgICAgPC9kaXY+CgogICAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTIgY29sLWlubGluZSI+CiAgICAgICAgICA8bGFiZWw+VHlwZTwvbGFiZWw+CiAgICAgICAgPC9kaXY+CiAgICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tNCI+CiAgICAgICAgICB7e2lucHV0IHZhbHVlPWNvbmZpZy5jb21tZXJjaWFsVHlwZSBjbGFzc05hbWVzPSJmb3JtLWNvbnRyb2wiIHBsYWNlaG9sZGVyPSJTcGVjaWZ5IHRoZSBjb21tZXJjaWFsIHR5cGUifX0KICAgICAgICA8L2Rpdj4KICAgICAgPC9kaXY+CiAgICAgIDxkaXYgY2xhc3M9InJvdyI+CiAgICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tMiBjb2wtaW5saW5lIj4KICAgICAgICAgIDxsYWJlbD5BZGRpdGlvbmFsIFZvbHVtZXM8L2xhYmVsPgogICAgICAgIDwvZGl2PgogICAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTQiPgogICAgICAgICAge3tpbnB1dCB2YWx1ZT1jb25maWcudm9sdW1lcyBjbGFzc05hbWVzPSJmb3JtLWNvbnRyb2wiIHBsYWNlaG9sZGVyPSJBdHRhY2ggYWRkaXRpb25hbCB2b2x1bWUgKGUuZy4sIDUwRykifX0KICAgICAgICA8L2Rpdj4KCiAgICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tMiBjb2wtaW5saW5lIj4KICAgICAgICAgIDxsYWJlbD5Cb290c2NyaXB0PC9sYWJlbD4KICAgICAgICA8L2Rpdj4KICAgICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi00Ij4KICAgICAgICAgIHt7aW5wdXQgdmFsdWU9Y29uZmlnLmJvb3RzY3JpcHQgY2xhc3NOYW1lcz0iZm9ybS1jb250cm9sIiBwbGFjZWhvbGRlcj0iU3BlY2lmeSB0aGUgYm9vdHNjcmlwdCJ9fQogICAgICAgIDwvZGl2PgogICAgICA8L2Rpdj4KICAgIDwvZGl2PgoKICAgIDxkaXYgY2xhc3M9InJvdyBib3ggbXQtMjAiPgogICAgICA8aDQ+TmV0d29yazwvaDQ+CiAgICAgIDxkaXYgY2xhc3M9InJvdyI+CiAgICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tMiBjb2wtaW5saW5lIj4KICAgICAgICAgIDxsYWJlbD5JUCBBZGRyZXNzPC9sYWJlbD4KICAgICAgICA8L2Rpdj4KICAgICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi00Ij4KICAgICAgICAgIHt7aW5wdXQgdmFsdWU9Y29uZmlnLmlwIGNsYXNzTmFtZXM9ImZvcm0tY29udHJvbCIgcGxhY2Vob2xkZXI9Ik9wdGlvbmFsbHkgc3BlY2lmeSB0aGUgSVAgQWRkcmVzcyJ9fQogICAgICAgIDwvZGl2PgoKICAgICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi0yIGNvbC1pbmxpbmUiPgogICAgICAgICAgPGxhYmVsPklQdjY8L2xhYmVsPgogICAgICAgIDwvZGl2PgogICAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTQiPgogICAgICAgICAge3tpbnB1dCB0eXBlPSJjaGVja2JveCIgdmFsdWU9Y29uZmlnLmlwdjZ9fQogICAgICAgIDwvZGl2PgogICAgICA8L2Rpdj4KICAgIDwvZGl2PgoKICAgIDxkaXYgY2xhc3M9InJvdyBib3ggbXQtMjAiPgogICAgICA8aDQ+RGVidWc8L2g0PgogICAgICA8ZGl2IGNsYXNzPSJyb3ciPgogICAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTIgY29sLWlubGluZSI+CiAgICAgICAgICA8bGFiZWw+RW5hYmxlIERlYnVnZ2luZzwvbGFiZWw+CiAgICAgICAgPC9kaXY+CiAgICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tNCI+CiAgICAgICAgICB7e2lucHV0IHR5cGU9ImNoZWNrYm94IiB2YWx1ZT1jb25maWcuZGVidWd9fQogICAgICAgIDwvZGl2PgogICAgICA8L2Rpdj4KICAgIDwvZGl2PgoKICAgIHt7IS0tIFRoaXMgZm9sbG93aW5nIGNvbnRhaW5zIHRoZSBOYW1lLCBMYWJlbHMgYW5kIEVuZ2luZSBPcHRpb25zIGZpZWxkcyAtLX19CiAgICA8ZGl2IGNsYXNzPSJvdmVyLWhyIj48c3Bhbj57e3RlbXBsYXRlT3B0aW9uc1RpdGxlfX08L3NwYW4+PC9kaXY+CgogICAge3tmb3JtLW5hbWUtZGVzY3JpcHRpb24KICAgICAgbW9kZWw9bW9kZWwKICAgICAgbmFtZVJlcXVpcmVkPXRydWUKICAgIH19CgogICAge3tmb3JtLXVzZXItbGFiZWxzCiAgICAgIGluaXRpYWxMYWJlbHM9bGFiZWxSZXNvdXJjZS5sYWJlbHMKICAgICAgc2V0TGFiZWxzPShhY3Rpb24gJ3NldExhYmVscycpCiAgICAgIGV4cGFuZEFsbD1leHBhbmRBbGwKICAgICAgZXhwYW5kPShhY3Rpb24gZXhwYW5kRm4pCiAgICB9fQoKICAgIHt7Zm9ybS1lbmdpbmUtb3B0cwogICAgICBtYWNoaW5lPW1vZGVsCiAgICAgIHNob3dFbmdpbmVVcmw9c2hvd0VuZ2luZVVybAogICAgfX0KICB7ey9hY2NvcmRpb24tbGlzdH19CgogIHt7IS0tIFRoaXMgY29tcG9uZW50IHNob3dzIGVycm9ycyBwcm9kdWNlZCBieSB2YWxpZGF0ZSgpIGluIHRoZSBjb21wb25lbnQgLS19fQogIHt7dG9wLWVycm9ycyBlcnJvcnM9ZXJyb3JzfX0KCiAge3shLS0gVGhpcyBjb21wb25lbnQgc2hvd3MgdGhlIENyZWF0ZSBhbmQgQ2FuY2VsIGJ1dHRvbnMgLS19fQogIHt7c2F2ZS1jYW5jZWwgc2F2ZT0ic2F2ZSIgY2FuY2VsPSJjYW5jZWwifX0KPC9zZWN0aW9uPg==";

  var computed = Ember.computed;
  var get = Ember.get;
  var set = Ember.set;
  var alias = Ember.computed.alias;
  var service = Ember.inject.service;

  var defaultRadix = 10;
  var defaultBase = 1024;
  exports.default = Ember.Component.extend(_nodeDriver.default, {
    driverName: 'scaleway',
    config: alias('model.scalewayConfig'),
    app: service(),

    init: function init() {
      var decodedLayout = window.atob(LAYOUT);
      var template = Ember.HTMLBars.compile(decodedLayout, {
        moduleName: 'nodes/components/driver-scaleway/template'
      });
      set(this, 'layout', template);

      this._super.apply(this, arguments);
    },

    bootstrap: function bootstrap() {
      var config = get(this, 'globalStore').createRecord({
        type: 'scalewayConfig',
        commercialType: 'START1-XS',
        region: '',
        name: '',
        debug: false,
        image: 'ubuntu-xenial',
        ip: '',
        ipv6: false,
        organization: '',
        token: '',
        volumes: '',
        bootscript: ''
      });

      set(this, 'model.scalewayConfig', config);
    },

    validate: function validate() {
      this._super();
      var errors = get(this, 'errors') || [];
      if (!get(this, 'model.name')) {
        errors.push('Name is required');
      }

      if (!get(this, 'config.commercialType')) {
        errors.push('Specifying a scaleway Instance Type is required');
      }

      if (!get(this, 'config.organization')) {
        errors.push('Specifying a scaleway Organization is required');
      }

      if (!get(this, 'config.token')) {
        errors.push('Specifying a scaleway Token is required');
      }

      if (!get(this, 'config.image')) {
        errors.push('Specifying a scaleway Image is required');
      }

      if (get(errors, 'length')) {
        set(this, 'errors', errors);
        return false;
      } else {
        set(this, 'errors', null);
        return true;
      }
    }
  });
});;
define('ui/components/driver-scaleway/component', ['exports', 'nodes/components/driver-scaleway/component'], function (exports, _component) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _component.default;
    }
  });
});