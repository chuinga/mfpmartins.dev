// CloudFront Function (viewer-request, runtime cloudfront-js-2.0)
// 1. Redirect www to the apex domain.
// 2. Map extensionless paths to the static export files (/about -> /about.html).
function handler(event) {
  var request = event.request;
  var uri = request.uri;
  var hostHeader = request.headers.host;
  var host = hostHeader ? hostHeader.value : '';

  if (host === 'www.mfpmartins.dev') {
    var query = '';
    var keys = Object.keys(request.querystring);
    if (keys.length > 0) {
      query =
        '?' +
        keys
          .map(function (key) {
            var item = request.querystring[key];
            return item.value === '' ? key : key + '=' + item.value;
          })
          .join('&');
    }

    return {
      statusCode: 301,
      statusDescription: 'Moved Permanently',
      headers: { location: { value: 'https://mfpmartins.dev' + uri + query } },
    };
  }

  // The root is served by the distribution's default root object (index.html)
  if (uri === '/') {
    return request;
  }

  // Next.js 16 static export bug (vercel/next.js#85374): the export writes
  // /about/__next.about/__PAGE__.txt but the client requests
  // /about/__next.about.__PAGE__.txt. Map the dotted name back to the nested path.
  var segments = uri.split('/');
  var file = segments[segments.length - 1];
  if (file.indexOf('__next.') === 0 && file.slice(-4) === '.txt') {
    var parts = file.slice(7, -4).split('.');
    if (parts.length >= 2) {
      segments[segments.length - 1] = '__next.' + parts[0] + '/' + parts.slice(1).join('/') + '.txt';
      request.uri = segments.join('/');
      return request;
    }
  }

  if (uri.charAt(uri.length - 1) === '/') {
    uri = uri.slice(0, -1);
  }

  var lastSegment = uri.substring(uri.lastIndexOf('/') + 1);
  if (lastSegment.indexOf('.') === -1) {
    request.uri = uri + '.html';
  }

  return request;
}
