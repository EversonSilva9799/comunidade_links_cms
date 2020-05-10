let generateSlug = function(partsLink) {
  try {
    if (!Array.isArray(partsLink)) {
      partsLink = [partsLink];
    }

    let link = '';
    partsLink.forEach(part => {
      part = part.replace(/ /g, '-');
      part = part.replace(/\//g, '');
      part = part
        .toLowerCase()
        .split(',')
        .join('')
        .split('.')
        .join('')
        .split(':')
        .join('')
        .split(';')
        .join('')
        .split('>')
        .join('')
        .split('<')
        .join('')
        .split('|')
        .join('')
        .split('(')
        .join('')
        .split(')')
        .join('')
        .split('&')
        .join('e')
        .trim();

      link = `${link}/${part}`.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      link = link.split('---').join('-');
      link = link.split('--').join('-');
      link = link.replace('/{2,}', '/');
    });

    return link;
  } catch (err) {
    console.log('err');
  }
};

module.exports = generateSlug;
