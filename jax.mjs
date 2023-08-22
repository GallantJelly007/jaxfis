import { JFile, JFileList, JFormData, JBuffer, Url} from './classes.mjs'
class Jax{

    /** Переменная для определения отправляется ли запрос с серверного приложения или клиента(браузера) */
    static isServer = typeof window ==='undefined'
    /** Использовать ли вместо XMLHTTPRequest FetchAPI */
    static useFetch = false

    static #protocol = 'http'

    static #responseTypes={
        TEXT:'text',
        BUFFER:'arraybuffer',
        JSON:'json',
        BLOB:'blob',
        DOC:'document'
    }

    static #sendTypes={
        URL:'url',
        JSON:'json',
        FORM:'form'
    }

    static #credentials = {
        NO_SEND:1,
        SAME_ORIGIN:2,
        ALL_SEND:3,
    }

    static #mimeFiles = [
        ['application/vnd.hzn-3d-crossword','.x3d'],
        ['video/3gpp','.3gp'],
        ['video/3gpp2','.3g2'],
        ['application/vnd.mseq','.mseq'],
        ['application/vnd.3m.post-it-notes','.pwn'],
        ['application/vnd.3gpp.pic-bw-large','.plb'],
        ['application/vnd.3gpp.pic-bw-small','.psb'],
        ['application/vnd.3gpp.pic-bw-var','.pvb'],
        ['application/vnd.3gpp2.tcap','.tcap'],
        ['application/x-7z-compressed','.7z'],
        ['application/x-abiword','.abw'],
        ['application/x-ace-compressed','.ace'],
        ['application/vnd.americandynamics.acc','.acc'],
        ['application/vnd.acucobol','.acu'],
        ['application/vnd.acucorp','.atc'],
        ['audio/adpcm','.adp'],
        ['application/x-authorware-bin','.aab'],
        ['application/x-authorware-map','.aam'],
        ['application/x-authorware-seg','.aas'],
        ['application/vnd.adobe.air-application-installer-package+zip','.air'],
        ['application/x-shockwave-flash','.swf'],
        ['application/vnd.adobe.fxp','.fxp'],
        ['application/pdf','.pdf'],
        ['application/vnd.cups-ppd','.ppd'],
        ['application/x-director','.dir'],
        ['application/vnd.adobe.xdp+xml','.xdp'],
        ['application/vnd.adobe.xfdf','.xfdf'],
        ['audio/x-aac','.aac'],
        ['application/vnd.ahead.space','.ahead'],
        ['application/vnd.airzip.filesecure.azf','.azf'],
        ['application/vnd.airzip.filesecure.azs','.azs'],
        ['application/vnd.amazon.ebook','.azw'],
        ['application/vnd.amiga.ami','.ami'],
        ['application/andrew-inset','N/A'],
        ['application/vnd.android.package-archive','.apk'],
        ['application/vnd.anser-web-certificate-issue-initiation','.cii'],
        ['application/vnd.anser-web-funds-transfer-initiation','.fti'],
        ['application/vnd.antix.game-component','.atx'],
        ['application/x-apple-diskimage','.dmg'],
        ['application/vnd.apple.installer+xml','.mpkg'],
        ['application/applixware','.aw'],
        ['application/vnd.hhe.lesson-player','.les'],
        ['application/x-freearc','.arc'],
        ['application/vnd.aristanetworks.swi','.swi'],
        ['text/x-asm','.s'],
        ['application/atomcat+xml','.atomcat'],
        ['application/atomsvc+xml','.atomsvc'],
        ['application/atom+xml','.atom'],
        ['application/pkix-attr-cert','.ac'],
        ['audio/x-aiff','.aif'],
        ['video/x-msvideo','.avi'],
        ['application/vnd.audiograph','.aep'],
        ['image/vnd.dxf','.dxf'],
        ['model/vnd.dwf','.dwf'],
        ['image/avif','.avif'],
        ['text/plain-bas','.par'],
        ['application/x-bcpio','.bcpio'],
        ['application/octet-stream','.bin'],
        ['image/bmp','.bmp'],
        ['application/x-bittorrent','.torrent'],
        ['application/vnd.rim.cod','.cod'],
        ['application/vnd.blueice.multipass','.mpm'],
        ['application/vnd.bmi','.bmi'],
        ['application/x-sh','.sh'],
        ['image/prs.btif','.btif'],
        ['application/vnd.businessobjects','.rep'],
        ['application/x-bzip','.bz'],
        ['application/x-bzip2','.bz2'],
        ['application/x-csh','.csh'],
        ['text/x-c','.c'],
        ['application/vnd.chemdraw+xml','.cdxml'],
        ['text/css','.css'],
        ['application/x-cdf','.cda'],
        ['chemical/x-cdx','.cdx'],
        ['chemical/x-cml','.cml'],
        ['chemical/x-csml','.csml'],
        ['application/vnd.contact.cmsg','.cdbcmsg'],
        ['application/vnd.claymore','.cla'],
        ['application/vnd.clonk.c4group','.c4g'],
        ['image/vnd.dvb.subtitle','.sub'],
        ['application/cdmi-capability','.cdmia'],
        ['application/cdmi-container','.cdmic'],
        ['application/cdmi-domain','.cdmid'],
        ['application/cdmi-object','.cdmio'],
        ['application/cdmi-queue','.cdmiq'],
        ['application/vnd.cluetrust.cartomobile-config','.c11amc'],
        ['application/vnd.cluetrust.cartomobile-config-pkg','.c11amz'],
        ['image/x-cmu-raster','.ras'],
        ['model/vnd.collada+xml','.dae'],
        ['text/csv','.csv'],
        ['application/mac-compactpro','.cpt'],
        ['application/vnd.wap.wmlc','.wmlc'],
        ['image/cgm','.cgm'],
        ['x-conference/x-cooltalk','.ice'],
        ['image/x-cmx','.cmx'],
        ['application/vnd.xara','.xar'],
        ['application/vnd.cosmocaller','.cmc'],
        ['application/x-cpio','.cpio'],
        ['application/vnd.crick.clicker','.clkx'],
        ['application/vnd.crick.clicker.keyboard','.clkk'],
        ['application/vnd.crick.clicker.palette','.clkp'],
        ['application/vnd.crick.clicker.template','.clkt'],
        ['application/vnd.crick.clicker.wordbank','.clkw'],
        ['application/vnd.criticaltools.wbs+xml','.wbs'],
        ['application/vnd.rig.cryptonote','.cryptonote'],
        ['chemical/x-cif','.cif'],
        ['chemical/x-cmdf','.cmdf'],
        ['application/cu-seeme','.cu'],
        ['application/prs.cww','.cww'],
        ['text/vnd.curl','.curl'],
        ['text/vnd.curl.dcurl','.dcurl'],
        ['text/vnd.curl.mcurl','.mcurl'],
        ['text/vnd.curl.scurl','.scurl'],
        ['application/vnd.curl.car','.car'],
        ['application/vnd.curl.pcurl','.pcurl'],
        ['application/vnd.yellowriver-custom-menu','.cmp'],
        ['application/dssc+der','.dssc'],
        ['application/dssc+xml','.xdssc'],
        ['application/x-debian-package','.deb'],
        ['audio/vnd.dece.audio','.uva'],
        ['image/vnd.dece.graphic','.uvi'],
        ['video/vnd.dece.hd','.uvh'],
        ['video/vnd.dece.mobile','.uvm'],
        ['video/vnd.uvvu.mp4','.uvu'],
        ['video/vnd.dece.pd','.uvp'],
        ['video/vnd.dece.sd','.uvs'],
        ['video/vnd.dece.video','.uvv'],
        ['application/x-dvi','.dvi'],
        ['application/vnd.fdsn.seed','.seed'],
        ['application/x-dtbook+xml','.dtb'],
        ['application/x-dtbresource+xml','.res'],
        ['application/vnd.dvb.ait','.ait'],
        ['application/vnd.dvb.service','.svc'],
        ['audio/vnd.digital-winds','.eol'],
        ['image/vnd.djvu','.djvu'],
        ['application/xml-dtd','.dtd'],
        ['application/vnd.dolby.mlp','.mlp'],
        ['application/x-doom','.wad'],
        ['application/vnd.dpgraph','.dpg'],
        ['audio/vnd.dra','.dra'],
        ['application/vnd.dreamfactory','.dfac'],
        ['audio/vnd.dts','.dts'],
        ['audio/vnd.dts.hd','.dtshd'],
        ['image/vnd.dwg','.dwg'],
        ['application/vnd.dynageo','.geo'],
        ['application/ecmascript','.es'],
        ['application/vnd.ecowin.chart','.mag'],
        ['image/vnd.fujixerox.edmics-mmr','.mmr'],
        ['image/vnd.fujixerox.edmics-rlc','.rlc'],
        ['application/exi','.exi'],
        ['application/vnd.proteus.magazine','.mgz'],
        ['application/epub+zip','.epub'],
        ['message/rfc822','.eml'],
        ['application/vnd.enliven','.nml'],
        ['application/vnd.is-xpr','.xpr'],
        ['image/vnd.xiff','.xif'],
        ['application/vnd.xfdl','.xfdl'],
        ['application/emma+xml','.emma'],
        ['application/vnd.ezpix-album','.ez2'],
        ['application/vnd.ezpix-package','.ez3'],
        ['image/vnd.fst','.fst'],
        ['video/vnd.fvt','.fvt'],
        ['image/vnd.fastbidsheet','.fbs'],
        ['application/vnd.denovo.fcselayout-link','.fe_launch'],
        ['video/x-f4v','.f4v'],
        ['video/x-flv','.flv'],
        ['image/vnd.fpx','.fpx'],
        ['image/vnd.net-fpx','.npx'],
        ['text/vnd.fmi.flexstor','.flx'],
        ['video/x-fli','.fli'],
        ['application/vnd.fluxtime.clip','.ftc'],
        ['application/vnd.fdf','.fdf'],
        ['text/x-fortran','.f'],
        ['application/vnd.mif','.mif'],
        ['application/vnd.framemaker','.fm'],
        ['image/x-freehand','.fh'],
        ['application/vnd.fsc.weblaunch','.fsc'],
        ['application/vnd.frogans.fnc','.fnc'],
        ['application/vnd.frogans.ltf','.ltf'],
        ['application/vnd.fujixerox.ddd','.ddd'],
        ['application/vnd.fujixerox.docuworks','.xdw'],
        ['application/vnd.fujixerox.docuworks.binder','.xbd'],
        ['application/vnd.fujitsu.oasys','.oas'],
        ['application/vnd.fujitsu.oasys2','.oa2'],
        ['application/vnd.fujitsu.oasys3','.oa3'],
        ['application/vnd.fujitsu.oasysgp','.fg5'],
        ['application/vnd.fujitsu.oasysprs','.bh2'],
        ['application/x-futuresplash','.spl'],
        ['application/vnd.fuzzysheet','.fzs'],
        ['image/g3fax','.g3'],
        ['application/vnd.gmx','.gmx'],
        ['model/vnd.gtw','.gtw'],
        ['application/vnd.genomatix.tuxedo','.txd'],
        ['application/vnd.geogebra.file','.ggb'],
        ['application/vnd.geogebra.tool','.ggt'],
        ['model/vnd.gdl','.gdl'],
        ['application/vnd.geometry-explorer','.gex'],
        ['application/vnd.geonext','.gxt'],
        ['application/vnd.geoplan','.g2w'],
        ['application/vnd.geospace','.g3w'],
        ['application/x-font-ghostscript','.gsf'],
        ['application/x-font-bdf','.bdf'],
        ['application/x-gtar','.gtar'],
        ['application/x-texinfo','.texinfo'],
        ['application/x-gnumeric','.gnumeric'],
        ['application/vnd.google-earth.kml+xml','.kml'],
        ['application/vnd.google-earth.kmz','.kmz'],
        ['application/gpx+xml','.gpx'],
        ['application/vnd.grafeq','.gqf'],
        ['image/gif','.gif'],
        ['text/vnd.graphviz','.gv'],
        ['application/vnd.groove-account','.gac'],
        ['application/vnd.groove-help','.ghf'],
        ['application/vnd.groove-identity-message','.gim'],
        ['application/vnd.groove-injector','.grv'],
        ['application/vnd.groove-tool-message','.gtm'],
        ['application/vnd.groove-tool-template','.tpl'],
        ['application/vnd.groove-vcard','.vcg'],
        ['application/gzip','.gz'],
        ['video/h261','.h261'],
        ['video/h263','.h263'],
        ['video/h264','.h264'],
        ['application/vnd.hp-hpid','.hpid'],
        ['application/vnd.hp-hps','.hps'],
        ['application/x-hdf','.hdf'],
        ['audio/vnd.rip','.rip'],
        ['application/vnd.hbci','.hbci'],
        ['application/vnd.hp-jlyt','.jlt'],
        ['application/vnd.hp-pcl','.pcl'],
        ['application/vnd.hp-hpgl','.hpgl'],
        ['application/vnd.yamaha.hv-script','.hvs'],
        ['application/vnd.yamaha.hv-dic','.hvd'],
        ['application/vnd.yamaha.hv-voice','.hvp'],
        ['application/vnd.hydrostatix.sof-data','.sfd-hdstx'],
        ['application/hyperstudio','.stk'],
        ['application/vnd.hal+xml','.hal'],
        ['text/html','.html'],
        ['application/vnd.ibm.rights-management','.irm'],
        ['application/vnd.ibm.secure-container','.sc'],
        ['text/calendar','.ics'],
        ['application/vnd.iccprofile','.icc'],
        ['image/x-icon','.ico'],
        ['application/vnd.igloader','.igl'],
        ['image/ief','.ief'],
        ['application/vnd.immervision-ivp','.ivp'],
        ['application/vnd.immervision-ivu','.ivu'],
        ['application/reginfo+xml','.rif'],
        ['text/vnd.in3d.3dml','.3dml'],
        ['text/vnd.in3d.spot','.spot'],
        ['model/iges','.igs'],
        ['application/vnd.intergeo','.i2g'],
        ['application/vnd.cinderella','.cdy'],
        ['application/vnd.intercon.formnet','.xpw'],
        ['application/vnd.isac.fcs','.fcs'],
        ['application/ipfix','.ipfix'],
        ['application/pkix-cert','.cer'],
        ['application/pkixcmp','.pki'],
        ['application/pkix-crl','.crl'],
        ['application/pkix-pkipath','.pkipath'],
        ['application/vnd.insors.igm','.igm'],
        ['application/vnd.ipunplugged.rcprofile','.rcprofile'],
        ['application/vnd.irepository.package+xml','.irp'],
        ['text/vnd.sun.j2me.app-descriptor','.jad'],
        ['application/java-archive','.jar'],
        ['application/java-vm','.class'],
        ['application/x-java-jnlp-file','.jnlp'],
        ['application/java-serialized-object','.ser'],
        ['text/x-java-source,java','.java'],
        ['application/javascript','.js'],
        ['text/javascript','.mjs'],
        ['text/javascript','.mjs'],
        ['application/json','.json'],
        ['application/vnd.joost.joda-archive','.joda'],
        ['video/jpm','.jpm'],
        ['image/jpeg','.jpeg'],
        ['image/jpeg','.jpg'],
        ['image/x-citrix-jpeg','.jpeg'],
        ['image/pjpeg','.pjpeg'],
        ['video/jpeg','.jpgv'],
        ['application/ld+json','.jsonld'],
        ['application/vnd.kahootz','.ktz'],
        ['application/vnd.chipnuts.karaoke-mmd','.mmd'],
        ['application/vnd.kde.karbon','.karbon'],
        ['application/vnd.kde.kchart','.chrt'],
        ['application/vnd.kde.kformula','.kfo'],
        ['application/vnd.kde.kivio','.flw'],
        ['application/vnd.kde.kontour','.kon'],
        ['application/vnd.kde.kpresenter','.kpr'],
        ['application/vnd.kde.kspread','.ksp'],
        ['application/vnd.kde.kword','.kwd'],
        ['application/vnd.kenameaapp','.htke'],
        ['application/vnd.kidspiration','.kia'],
        ['application/vnd.kinar','.kne'],
        ['application/vnd.kodak-descriptor','.sse'],
        ['application/vnd.las.las+xml','.lasxml'],
        ['application/x-latex','.latex'],
        ['application/vnd.llamagraphics.life-balance.desktop','.lbd'],
        ['application/vnd.llamagraphics.life-balance.exchange+xml','.lbe'],
        ['application/vnd.jam','.jam'],
        ['application/vnd.lotus-1-2-3','.123'],
        ['application/vnd.lotus-approach','.apr'],
        ['application/vnd.lotus-freelance','.pre'],
        ['application/vnd.lotus-notes','.nsf'],
        ['application/vnd.lotus-organizer','.org'],
        ['application/vnd.lotus-screencam','.scm'],
        ['application/vnd.lotus-wordpro','.lwp'],
        ['audio/vnd.lucent.voice','.lvp'],
        ['audio/x-mpegurl','.m3u'],
        ['video/x-m4v','.m4v'],
        ['application/mac-binhex40','.hqx'],
        ['application/vnd.macports.portpkg','.portpkg'],
        ['application/vnd.osgeo.mapguide.package','.mgp'],
        ['application/marc','.mrc'],
        ['application/marcxml+xml','.mrcx'],
        ['application/mxf','.mxf'],
        ['application/vnd.wolfram.player','.nbp'],
        ['application/mathematica','.ma'],
        ['application/mathml+xml','.mathml'],
        ['application/mbox','.mbox'],
        ['application/vnd.medcalcdata','.mc1'],
        ['application/mediaservercontrol+xml','.mscml'],
        ['application/vnd.mediastation.cdkey','.cdkey'],
        ['application/vnd.mfer','.mwf'],
        ['application/vnd.mfmp','.mfm'],
        ['model/mesh','.msh'],
        ['application/mads+xml','.mads'],
        ['application/mets+xml','.mets'],
        ['application/mods+xml','.mods'],
        ['application/metalink4+xml','.meta4'],
        ['application/vnd.mcd','.mcd'],
        ['application/vnd.micrografx.flo','.flo'],
        ['application/vnd.micrografx.igx','.igx'],
        ['application/vnd.eszigno3+xml','.es3'],
        ['application/x-msaccess','.mdb'],
        ['video/x-ms-asf','.asf'],
        ['application/x-msdownload','.exe'],
        ['application/vnd.ms-artgalry','.cil'],
        ['application/vnd.ms-cab-compressed','.cab'],
        ['application/vnd.ms-ims','.ims'],
        ['application/x-ms-application','.application'],
        ['application/x-msclip','.clp'],
        ['image/vnd.ms-modi','.mdi'],
        ['application/vnd.ms-fontobject','.eot'],
        ['application/vnd.ms-excel','.xls'],
        ['application/vnd.ms-excel.addin.macroenabled.12','.xlam'],
        ['application/vnd.ms-excel.sheet.binary.macroenabled.12','.xlsb'],
        ['application/vnd.ms-excel.template.macroenabled.12','.xltm'],
        ['application/vnd.ms-excel.sheet.macroenabled.12','.xlsm'],
        ['application/vnd.ms-htmlhelp','.chm'],
        ['application/x-mscardfile','.crd'],
        ['application/vnd.ms-lrm','.lrm'],
        ['application/x-msmediaview','.mvb'],
        ['application/x-msmoney','.mny'],
        ['application/vnd.openxmlformats-officedocument.presentationml.presentation','.pptx'],
        ['application/vnd.openxmlformats-officedocument.presentationml.slide','.sldx'],
        ['application/vnd.openxmlformats-officedocument.presentationml.slideshow','.ppsx'],
        ['application/vnd.openxmlformats-officedocument.presentationml.template','.potx'],
        ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','.xlsx'],
        ['application/vnd.openxmlformats-officedocument.spreadsheetml.template','.xltx'],
        ['application/vnd.openxmlformats-officedocument.wordprocessingml.document','.docx'],
        ['application/vnd.openxmlformats-officedocument.wordprocessingml.template','.dotx'],
        ['application/x-msbinder','.obd'],
        ['application/vnd.ms-officetheme','.thmx'],
        ['application/onenote','.onetoc'],
        ['audio/vnd.ms-playready.media.pya','.pya'],
        ['video/vnd.ms-playready.media.pyv','.pyv'],
        ['application/vnd.ms-powerpoint','.ppt'],
        ['application/vnd.ms-powerpoint.addin.macroenabled.12','.ppam'],
        ['application/vnd.ms-powerpoint.slide.macroenabled.12','.sldm'],
        ['application/vnd.ms-powerpoint.presentation.macroenabled.12','.pptm'],
        ['application/vnd.ms-powerpoint.slideshow.macroenabled.12','.ppsm'],
        ['application/vnd.ms-powerpoint.template.macroenabled.12','.potm'],
        ['application/vnd.ms-project','.mpp'],
        ['application/x-mspublisher','.pub'],
        ['application/x-msschedule','.scd'],
        ['application/x-silverlight-app','.xap'],
        ['application/vnd.ms-pki.stl','.stl'],
        ['application/vnd.ms-pki.seccat','.cat'],
        ['application/vnd.visio','.vsd'],
        ['application/vnd.visio2013','.vsdx'],
        ['video/x-ms-wm','.wm'],
        ['audio/x-ms-wma','.wma'],
        ['audio/x-ms-wax','.wax'],
        ['video/x-ms-wmx','.wmx'],
        ['application/x-ms-wmd','.wmd'],
        ['application/vnd.ms-wpl','.wpl'],
        ['application/x-ms-wmz','.wmz'],
        ['video/x-ms-wmv','.wmv'],
        ['video/x-ms-wvx','.wvx'],
        ['application/x-msmetafile','.wmf'],
        ['application/x-msterminal','.trm'],
        ['application/msword','.doc'],
        ['application/vnd.ms-word.document.macroenabled.12','.docm'],
        ['application/vnd.ms-word.template.macroenabled.12','.dotm'],
        ['application/x-mswrite','.wri'],
        ['application/vnd.ms-works','.wps'],
        ['application/x-ms-xbap','.xbap'],
        ['application/vnd.ms-xpsdocument','.xps'],
        ['audio/midi','.midi'],
        ['audio/midi','.mid'],
        ['application/vnd.ibm.minipay','.mpy'],
        ['application/vnd.ibm.modcap','.afp'],
        ['application/vnd.jcp.javame.midlet-rms','.rms'],
        ['application/vnd.tmobile-livetv','.tmo'],
        ['application/x-mobipocket-ebook','.prc'],
        ['application/vnd.mobius.mbk','.mbk'],
        ['application/vnd.mobius.dis','.dis'],
        ['application/vnd.mobius.plc','.plc'],
        ['application/vnd.mobius.mqy','.mqy'],
        ['application/vnd.mobius.msl','.msl'],
        ['application/vnd.mobius.txf','.txf'],
        ['application/vnd.mobius.daf','.daf'],
        ['text/vnd.fly','.fly'],
        ['application/vnd.mophun.certificate','.mpc'],
        ['application/vnd.mophun.application','.mpn'],
        ['video/mj2','.mj2'],
        ['audio/mpeg','.mpga'],
        ['video/mp2t','.ts'],
        ['video/vnd.mpegurl','.mxu'],
        ['video/mpeg','.mpeg'],
        ['application/mp21','.m21'],
        ['audio/mp4','.mp4a'],
        ['video/mp4','.mp4'],
        ['application/mp4','.mp4'],
        ['application/vnd.apple.mpegurl','.m3u8'],
        ['application/vnd.musician','.mus'],
        ['application/vnd.muvee.style','.msty'],
        ['application/xv+xml','.mxml'],
        ['application/vnd.nokia.n-gage.data','.ngdat'],
        ['application/vnd.nokia.n-gage.symbian.install','.n-gage'],
        ['application/x-dtbncx+xml','.ncx'],
        ['application/x-netcdf','.nc'],
        ['application/vnd.neurolanguage.nlu','.nlu'],
        ['application/vnd.dna','.dna'],
        ['application/vnd.noblenet-directory','.nnd'],
        ['application/vnd.noblenet-sealer','.nns'],
        ['application/vnd.noblenet-web','.nnw'],
        ['application/vnd.nokia.radio-preset','.rpst'],
        ['application/vnd.nokia.radio-presets','.rpss'],
        ['text/n3','.n3'],
        ['application/vnd.novadigm.edm','.edm'],
        ['application/vnd.novadigm.edx','.edx'],
        ['application/vnd.novadigm.ext','.ext'],
        ['application/vnd.flographit','.gph'],
        ['audio/vnd.nuera.ecelp4800','.ecelp4800'],
        ['audio/vnd.nuera.ecelp7470','.ecelp7470'],
        ['audio/vnd.nuera.ecelp9600','.ecelp9600'],
        ['application/oda','.oda'],
        ['application/ogg','.ogx'],
        ['audio/ogg','.oga'],
        ['video/ogg','.ogv'],
        ['application/vnd.oma.dd2+xml','.dd2'],
        ['application/vnd.oasis.opendocument.text-web','.oth'],
        ['application/oebps-package+xml','.opf'],
        ['application/vnd.intu.qbo','.qbo'],
        ['application/vnd.openofficeorg.extension','.oxt'],
        ['application/vnd.yamaha.openscoreformat','.osf'],
        ['audio/webm','.weba'],
        ['video/webm','.webm'],
        ['application/vnd.oasis.opendocument.chart','.odc'],
        ['application/vnd.oasis.opendocument.chart-template','.otc'],
        ['application/vnd.oasis.opendocument.database','.odb'],
        ['application/vnd.oasis.opendocument.formula','.odf'],
        ['application/vnd.oasis.opendocument.formula-template','.odft'],
        ['application/vnd.oasis.opendocument.graphics','.odg'],
        ['application/vnd.oasis.opendocument.graphics-template','.otg'],
        ['application/vnd.oasis.opendocument.image','.odi'],
        ['application/vnd.oasis.opendocument.image-template','.oti'],
        ['application/vnd.oasis.opendocument.presentation','.odp'],
        ['application/vnd.oasis.opendocument.presentation-template','.otp'],
        ['application/vnd.oasis.opendocument.spreadsheet','.ods'],
        ['application/vnd.oasis.opendocument.spreadsheet-template','.ots'],
        ['application/vnd.oasis.opendocument.text','.odt'],
        ['application/vnd.oasis.opendocument.text-master','.odm'],
        ['application/vnd.oasis.opendocument.text-template','.ott'],
        ['image/ktx','.ktx'],
        ['application/vnd.sun.xml.calc','.sxc'],
        ['application/vnd.sun.xml.calc.template','.stc'],
        ['application/vnd.sun.xml.draw','.sxd'],
        ['application/vnd.sun.xml.draw.template','.std'],
        ['application/vnd.sun.xml.impress','.sxi'],
        ['application/vnd.sun.xml.impress.template','.sti'],
        ['application/vnd.sun.xml.math','.sxm'],
        ['application/vnd.sun.xml.writer','.sxw'],
        ['application/vnd.sun.xml.writer.global','.sxg'],
        ['application/vnd.sun.xml.writer.template','.stw'],
        ['application/x-font-otf','.otf'],
        ['audio/opus','.opus'],
        ['application/vnd.yamaha.openscoreformat.osfpvg+xml','.osfpvg'],
        ['application/vnd.osgi.dp','.dp'],
        ['application/vnd.palm','.pdb'],
        ['text/x-pascal','.p'],
        ['application/vnd.pawaafile','.paw'],
        ['application/vnd.hp-pclxl','.pclxl'],
        ['application/vnd.picsel','.efif'],
        ['image/x-pcx','.pcx'],
        ['image/vnd.adobe.photoshop','.psd'],
        ['application/pics-rules','.prf'],
        ['image/x-pict','.pic'],
        ['application/x-chat','.chat'],
        ['application/pkcs10','.p10'],
        ['application/x-pkcs12','.p12'],
        ['application/pkcs7-mime','.p7m'],
        ['application/pkcs7-signature','.p7s'],
        ['application/x-pkcs7-certreqresp','.p7r'],
        ['application/x-pkcs7-certificates','.p7b'],
        ['application/pkcs8','.p8'],
        ['application/vnd.pocketlearn','.plf'],
        ['image/x-portable-anymap','.pnm'],
        ['image/x-portable-bitmap','.pbm'],
        ['application/x-font-pcf','.pcf'],
        ['application/font-tdpfr','.pfr'],
        ['application/x-chess-pgn','.pgn'],
        ['image/x-portable-graymap','.pgm'],
        ['image/png','.png'],
        ['image/x-citrix-png','.png'],
        ['image/x-png','.png'],
        ['image/x-portable-pixmap','.ppm'],
        ['application/pskc+xml','.pskcxml'],
        ['application/vnd.ctc-posml','.pml'],
        ['application/postscript','.ai'],
        ['application/x-font-type1','.pfa'],
        ['application/vnd.powerbuilder6','.pbd'],
        ['application/pgp-encrypted','.pgp'],
        ['application/pgp-signature','.pgp'],
        ['application/vnd.previewsystems.box','.box'],
        ['application/vnd.pvi.ptid1','.ptid'],
        ['application/pls+xml','.pls'],
        ['application/vnd.pg.format','.str'],
        ['application/vnd.pg.osasli','.ei6'],
        ['text/prs.lines.tag','.dsc'],
        ['application/x-font-linux-psf','.psf'],
        ['application/vnd.publishare-delta-tree','.qps'],
        ['application/vnd.pmi.widget','.wg'],
        ['application/vnd.quark.quarkxpress','.qxd'],
        ['application/vnd.epson.esf','.esf'],
        ['application/vnd.epson.msf','.msf'],
        ['application/vnd.epson.ssf','.ssf'],
        ['application/vnd.epson.quickanime','.qam'],
        ['application/vnd.intu.qfx','.qfx'],
        ['video/quicktime','.qt'],
        ['application/x-rar-compressed','.rar'],
        ['audio/x-pn-realaudio','.ram'],
        ['audio/x-pn-realaudio-plugin','.rmp'],
        ['application/rsd+xml','.rsd'],
        ['application/vnd.rn-realmedia','.rm'],
        ['application/vnd.realvnc.bed','.bed'],
        ['application/vnd.recordare.musicxml','.mxl'],
        ['application/vnd.recordare.musicxml+xml','.musicxml'],
        ['application/relax-ng-compact-syntax','.rnc'],
        ['application/vnd.data-vision.rdz','.rdz'],
        ['application/rdf+xml','.rdf'],
        ['application/vnd.cloanto.rp9','.rp9'],
        ['application/vnd.jisp','.jisp'],
        ['application/rtf','.rtf'],
        ['text/richtext','.rtx'],
        ['application/vnd.route66.link66+xml','.link66'],
        ['application/rss+xml','.rss'],
        ['application/shf+xml','.shf'],
        ['application/vnd.sailingtracker.track','.st'],
        ['image/svg+xml','.svg'],
        ['application/vnd.sus-calendar','.sus'],
        ['application/sru+xml','.sru'],
        ['application/set-payment-initiation','.setpay'],
        ['application/set-registration-initiation','.setreg'],
        ['application/vnd.sema','.sema'],
        ['application/vnd.semd','.semd'],
        ['application/vnd.semf','.semf'],
        ['application/vnd.seemail','.see'],
        ['application/x-font-snf','.snf'],
        ['application/scvp-vp-request','.spq'],
        ['application/scvp-vp-response','.spp'],
        ['application/scvp-cv-request','.scq'],
        ['application/scvp-cv-response','.scs'],
        ['application/sdp','.sdp'],
        ['text/x-setext','.etx'],
        ['video/x-sgi-movie','.movie'],
        ['application/vnd.shana.informed.formdata','.ifm'],
        ['application/vnd.shana.informed.formtemplate','.itp'],
        ['application/vnd.shana.informed.interchange','.iif'],
        ['application/vnd.shana.informed.package','.ipk'],
        ['application/thraud+xml','.tfi'],
        ['application/x-shar','.shar'],
        ['image/x-rgb','.rgb'],
        ['application/vnd.epson.salt','.slt'],
        ['application/vnd.accpac.simply.aso','.aso'],
        ['application/vnd.accpac.simply.imp','.imp'],
        ['application/vnd.simtech-mindmapper','.twd'],
        ['application/vnd.commonspace','.csp'],
        ['application/vnd.yamaha.smaf-audio','.saf'],
        ['application/vnd.smaf','.mmf'],
        ['application/vnd.yamaha.smaf-phrase','.spf'],
        ['application/vnd.smart.teacher','.teacher'],
        ['application/vnd.svd','.svd'],
        ['application/sparql-query','.rq'],
        ['application/sparql-results+xml','.srx'],
        ['application/srgs','.gram'],
        ['application/srgs+xml','.grxml'],
        ['application/ssml+xml','.ssml'],
        ['application/vnd.koan','.skp'],
        ['text/sgml','.sgml'],
        ['application/vnd.stardivision.calc','.sdc'],
        ['application/vnd.stardivision.draw','.sda'],
        ['application/vnd.stardivision.impress','.sdd'],
        ['application/vnd.stardivision.math','.smf'],
        ['application/vnd.stardivision.writer','.sdw'],
        ['application/vnd.stardivision.writer-global','.sgl'],
        ['application/vnd.stepmania.stepchart','.sm'],
        ['application/x-stuffit','.sit'],
        ['application/x-stuffitx','.sitx'],
        ['application/vnd.solent.sdkm+xml','.sdkm'],
        ['application/vnd.olpc-sugar','.xo'],
        ['audio/basic','.au'],
        ['application/vnd.wqd','.wqd'],
        ['application/vnd.symbian.install','.sis'],
        ['application/smil+xml','.smi'],
        ['application/vnd.syncml+xml','.xsm'],
        ['application/vnd.syncml.dm+wbxml','.bdm'],
        ['application/vnd.syncml.dm+xml','.xdm'],
        ['application/x-sv4cpio','.sv4cpio'],
        ['application/x-sv4crc','.sv4crc'],
        ['application/sbml+xml','.sbml'],
        ['text/tab-separated-values','.tsv'],
        ['image/tiff','.tiff'],
        ['application/vnd.tao.intent-module-archive','.tao'],
        ['application/x-tar','.tar'],
        ['application/x-tcl','.tcl'],
        ['application/x-tex','.tex'],
        ['application/x-tex-tfm','.tfm'],
        ['application/tei+xml','.tei'],
        ['text/plain','.txt'],
        ['application/vnd.spotfire.dxp','.dxp'],
        ['application/vnd.spotfire.sfs','.sfs'],
        ['application/timestamped-data','.tsd'],
        ['application/vnd.trid.tpt','.tpt'],
        ['application/vnd.triscape.mxs','.mxs'],
        ['text/troff','.t'],
        ['application/vnd.trueapp','.tra'],
        ['application/x-font-ttf','.ttf'],
        ['text/turtle','.ttl'],
        ['application/vnd.umajin','.umj'],
        ['application/vnd.uoml+xml','.uoml'],
        ['application/vnd.unity','.unityweb'],
        ['application/vnd.ufdl','.ufd'],
        ['text/uri-list','.uri'],
        ['application/vnd.uiq.theme','.utz'],
        ['application/x-ustar','.ustar'],
        ['text/x-uuencode','.uu'],
        ['text/x-vcalendar','.vcs'],
        ['text/x-vcard','.vcf'],
        ['application/x-cdlink','.vcd'],
        ['application/vnd.vsf','.vsf'],
        ['model/vrml','.wrl'],
        ['application/vnd.vcx','.vcx'],
        ['model/vnd.mts','.mts'],
        ['model/vnd.vtu','.vtu'],
        ['application/vnd.visionary','.vis'],
        ['video/vnd.vivo','.viv'],
        ['application/ccxml+xml,','.ccxml'],
        ['application/voicexml+xml','.vxml'],
        ['application/x-wais-source','.src'],
        ['application/vnd.wap.wbxml','.wbxml'],
        ['image/vnd.wap.wbmp','.wbmp'],
        ['audio/x-wav','.wav'],
        ['application/davmount+xml','.davmount'],
        ['application/x-font-woff','.woff'],
        ['application/wspolicy+xml','.wspolicy'],
        ['image/webp','.webp'],
        ['application/vnd.webturbo','.wtb'],
        ['application/widget','.wgt'],
        ['application/winhlp','.hlp'],
        ['text/vnd.wap.wml','.wml'],
        ['text/vnd.wap.wmlscript','.wmls'],
        ['application/vnd.wap.wmlscriptc','.wmlsc'],
        ['application/vnd.wordperfect','.wpd'],
        ['application/vnd.wt.stf','.stf'],
        ['application/wsdl+xml','.wsdl'],
        ['image/x-xbitmap','.xbm'],
        ['image/x-xpixmap','.xpm'],
        ['image/x-xwindowdump','.xwd'],
        ['application/x-x509-ca-cert','.der'],
        ['application/x-xfig','.fig'],
        ['application/xhtml+xml','.xhtml'],
        ['application/xml','.xml'],
        ['application/xcap-diff+xml','.xdf'],
        ['application/xenc+xml','.xenc'],
        ['application/patch-ops-error+xml','.xer'],
        ['application/resource-lists+xml','.rl'],
        ['application/rls-services+xml','.rs'],
        ['application/resource-lists-diff+xml','.rld'],
        ['application/xslt+xml','.xslt'],
        ['application/xop+xml','.xop'],
        ['application/x-xpinstall','.xpi'],
        ['application/xspf+xml','.xspf'],
        ['application/vnd.mozilla.xul+xml','.xul'],
        ['chemical/x-xyz','.xyz'],
        ['text/yaml','.yaml'],
        ['application/yang','.yang'],
        ['application/yin+xml','.yin'],
        ['application/vnd.zul','.zir'],
        ['application/zip','.zip'],
        ['application/vnd.handheld-entertainment+xml','.zmm'],
        ['application/vnd.zzazz.deck+xml','.zaz']
    ];

    static setSSL(isSet=true){
        this.#protocol = isSet?'https':'http'
    } 

    /**
     * Типы ответа используемые при отправке запроса
     */
    static get RESPONSE_TYPES(){
        return Jax.#responseTypes
    }

    /**
     * Тип запроса
     */
    static get SEND_TYPES(){
        return Jax.#sendTypes
    }

    /**
     * Разрешения
     */
    static get CREDENTIALS(){
        return Jax.#credentials
    }

    /**
     * Mime-типы данных
     */
    static get MIME_FILES(){
        return Jax.#mimeFiles
    }

    static get PROTOCOL(){
        return Jax.#protocol
    }
    /**
     * Асинхронная функция отправки POST-запроса
     * @param {string} url 
     * @param {object} params 
     * @param {Map<string,string>|undefined} [params.headers]
     * Коллекция для дополнительных заголовков. Content-Type устанавливать не нужно.
     * @param {object|JFormData|FormData|Map|HTMLFormElement|File|FileList|JFile|JFileList|string|undefined} params.body
     * Объект, FormData, либо коллекция с данными для отправки на сервер. Так же можно использовать form HTMLElement или id элемента представляющего форму. C responseType='json' поддерживает отправку объектов с глубокой вложенностью и Map-коллекциями
     * @param {string|undefined} [params.responseType] 
     * Тип ответа от сервера:
     * 
     * json - (По умолчанию) JSON-объект
     * 
     * text - Обычный текст
     * 
     * arraybuffer - Данные в ArrayBuffer
     * 
     * blob - Данные в Blob
     * 
     * document - Данные как XML/HTTP документ
     * 
     * @param {string|undefined} [params.sendType]
     * Тип отправки данных, устанавливает ContentType заголовок, поэтому его не нужно передавать в headers, типы отправки:
     * 
     * url - (По умолчанию) Отправляет данные как URL-строку
     * 
     * json - Отправляет данные в JSON формате с заголовком application/json
     * 
     * form - Отправляет данные с помощью FormData и заголовком multipart/form-data
     * 
     * @param {number|undefined} [params.credentials] 
     * Устанавливает credentials для кросс-доменных запросов. Значение из Jax.CREDENTIALS
     * 
     * @param {function} [params.progress]
     * Callback-функция для получения текущего прогресса (не работает для отправки с сервера)
     * @returns {Promise<object>} Возвращает Promise c результатом в случае успешного выполнения 
     */

    static async post(url,params){
        let request = new JaxRequest('POST')
        return request.executeRequest(url,params);
    }
    /**
     * Асинхронная функция отправки GET-запроса
     * @param {string} url 
     * @param {object} params 
     * @param {Map<string,string>|undefined} [params.headers] 
     * Коллекция для дополнительных заголовков. Content-Type устанавливать не нужно.
     * @param {object|JFormData|FormData|Map|HTMLFormElement|string|undefined} [params.body]
     * Объект, FormData, либо коллекция с данными для отправки на сервер. Так же можно использовать form HTMLElement или id элемента представляющего форму. C responseType='json' поддерживает отправку объектов с глубокой вложенностью и Map-коллекциями
     * @param {string|undefined} [params.responseType] 
     * Тип ответа от сервера:
     * 
     * json - (По умолчанию) JSON-объект
     * 
     * text - Обычный текст
     * 
     * arraybuffer - Данные в ArrayBuffer
     * 
     * blob - Данные в Blob
     * 
     * document - Данные как XML/HTTP документ
     * 
     * @param {number|undefined} [params.credentials]
     * Устанавливает credentials для кросс-доменных запросов. Значение из Jax.CREDENTIALS
     * @param {function} [params.progress]
     * Callback-функция для получения текущего прогресса (не работает для отправки с сервера)
     * @returns {Promise<object>} Возвращает Promise c результатом в случае успешного выполнения 
     */
    static async get(url,params){
        let request = new JaxRequest('GET')
        return request.executeRequest(url,params);
    }

   /**
     * Асинхронная функция отправки PUT-запроса
     * @param {string} url 
     * @param {object} params 
     * @param {Map<string,string>|undefined} [params.headers] 
     * Коллекция для дополнительных заголовков. Content-Type устанавливать не нужно.
     * @param {object|JFormData|FormData|Map|HTMLFormElement|string|undefined} [params.body]
     * Объект, FormData, либо коллекция с данными для отправки на сервер. Так же можно использовать form HTMLElement или id элемента представляющего форму. C responseType='json' поддерживает отправку объектов с глубокой вложенностью и Map-коллекциями
     * @param {string|undefined} [params.responseType] 
     * Тип ответа от сервера:
     * 
     * json - (По умолчанию) JSON-объект
     * 
     * text - Обычный текст
     * 
     * arraybuffer - Данные в ArrayBuffer
     * 
     * blob - Данные в Blob
     * 
     * document - Данные как XML/HTTP документ
     * 
     * @param {string|undefined} [params.sendType]
     * Тип отправки данных, устанавливает ContentType заголовок, поэтому его не нужно передавать в headers, типы отправки:
     * 
     * url - (По умолчанию) Отправляет данные как URL-строку
     * 
     * json - Отправляет данные в JSON формате с заголовком application/json
     * 
     * form - Отправляет данные с помощью FormData и заголовком multipart/form-data
     * 
     * @param {number|undefined} [params.credentials]
     * Устанавливает credentials для кросс-доменных запросов. Значение из Jax.CREDENTIALS
     * 
     * @param {function} [params.progress]
     * Callback-функция для получения текущего прогресса (не работает для отправки с сервера)
     * @returns {Promise<object>} Возвращает Promise c результатом в случае успешного выполнения 
     */
    static async put(url,params){
        let request = new JaxRequest('PUT')
        return request.executeRequest(url,params);
    }

    /**
     * Асинхронная функция отправки DELETE-запроса
     * @param {string} url 
     * @param {object} params 
     * @param {Map<string,string>|undefined} [params.headers] 
     * Коллекция для дополнительных заголовков. Content-Type устанавливать не нужно.
     * @param {object|JFormData|FormData|Map|undefined} [params.body]
     * Объект, FormData, либо коллекция с данными для отправки на сервер. C responseType='json' поддерживает отправку объектов с глубокой вложенностью и Map-коллекциями
     * @param {string|undefined} [params.responseType]
     * Тип ответа от сервера:
     * 
     * json - (По умолчанию) JSON-объект
     * 
     * text - Обычный текст
     * 
     * arraybuffer - Данные в ArrayBuffer
     * 
     * blob - Данные в Blob
     * 
     * document - Данные как XML/HTTP документ
     * 
     * @param {number|undefined} [params.credentials]
     * Устанавливает credentials для кросс-доменных запросов. Значение из Jax.CREDENTIALS
     * 
     * @param {function} [params.progress]
     * Callback-функция для получения текущего прогресса (не работает для отправки с сервера)
     * @returns {Promise<object>} Возвращает Promise c результатом в случае успешного выполнения 
     */
    static async delete(url,params){
        let request = new JaxRequest('DELETE')
        return request.executeRequest(url,params);
    } 
    

    /**
     * Асинхронная функция отправки файлов POST-запросом
     * @param {string} url 
     * @param {object} params 
     * @param {Map<string,string>|undefined} [params.headers] 
     * Коллекция для дополнительных заголовков. Content-Type устанавливать не нужно.
     * @param {string|undefined} [params.responseType] 
     * Тип ответа от сервера:
     * 
     * json - (По умолчанию) JSON-объект
     * 
     * text - Обычный текст
     * 
     * arraybuffer - Данные в ArrayBuffer
     * 
     * blob - Данные в Blob
     * 
     * document - Данные как XML/HTTP документ
     * 
     * @param {File|FileList|JFile|JFileList} [params.body]
     * Файл или коллекция отправляемых файлов (Обязательный параметр)
     * 
     * @param {boolean} [params.isMultipart]
     * Отправить данные с заголовком multipart/form-data (по умолчанию true)
     * 
     * @param {number|undefined} [params.credentials] 
     * Устанавливает credentials для кросс-доменных запросов. Значение из Jax.CREDENTIALS
     * 
     * @param {function} [params.progress]
     * Callback-функция для получения текущего прогресса (не работает для отправки с сервера)
     * @returns {Promise<object>} 
     * Возвращает Promise c результатом в случае успешного выполнения 
     * (При установке isMultipart:false и передаче FileList возвращает массив с результатами всех промисов)
     */
    static async file(url,params){
        if((typeof File === 'function' && params?.body instanceof File) 
        || (typeof FileList === 'function' && params?.body instanceof FileList)
        || params?.body instanceof JFile
        || params?.body instanceof JFileList){
            if(params?.isMultipart === false && ((typeof FileList === 'function' && params?.body instanceof FileList) || params?.body instanceof JFileList)){
                let promises = []
                let files = params.body
                delete params.body
                for(let file of files){
                    let request = new JaxRequest('POST')
                    let paramsCopy = {...params,body:file}
                    paramsCopy.body = file
                    promises.push(request.executeRequest(url,paramsCopy,true))
                }
                return Promise.allSettled(promises)
            }else{
                let request = new JaxRequest('POST')
                return request.executeRequest(url,params,true);
            }
        }else{
            throw new Error('params.body must be of type File, FileList, Jfile or JFileList!')
        }  
    }
}

class JaxRequest{
    #credentials
    #onprogress
    #method
    #headers=new Map()
    #body
    #url
    #responseType
    #isServer = Jax.isServer
    #protocol = Jax.PROTOCOL
    #isMultipartFilesSend = true

    constructor(method){
        this.#method=method
    }

    async executeRequest(url,params,file=false){
        this.#url=url
        if(this.#isServer){
            if(await this.#convertParams(params,file)) return this.#sendServer()
        }else{
            this.#create()
            if(await this.#convertParams(params,file)){
                if(Jax.useFetch)
                    return this.#sendFetch()
                else
                    return this.#send()
            }
        }
    }

	#create(){
		let request = null
		if (window.XMLHttpRequest)
		{
			request = new XMLHttpRequest()
		}
		else if (window.ActiveXObject)
		{
			try
			{
				request = new ActiveXObject("Microsoft.XMLHTTP")
			}    
			catch (CatchException)
			{
				request = new ActiveXObject("Msxml2.XMLHTTP")
			}
		}
		if (!request)
		{
            throw new Error("Unable create XMLHttpRequest")
		}
        return request
	}

    #getCredentials(credentials){
        if(Jax.useFetch){
            switch(credentials){
                case Jax.CREDENTIALS.SAME_ORIGIN:
                    return 'same-origin'
                case Jax.CREDENTIALS.ALL_SEND:
                    return 'include'
                case Jax.CREDENTIALS.NO_SEND:
                default:
                    return 'omit'
            }
        }else{
            switch(credentials){
                case Jax.CREDENTIALS.ALL_SEND:
                    return true
                case Jax.CREDENTIALS.NO_SEND:
                case Jax.CREDENTIALS.SAME_ORIGIN:
                default:
                    return false
            }
        }
    }

    #jsonMapReplacer(key, value){
        if (value instanceof Map) {
            return {
                dataType: 'Map',
                value: Array.from(value.entries()), 
            };
        } else {
            return value;
        }
    }

    #jsonMapReviewer(key, value) {
        if(value instanceof Object) {
            if (value.bodyType === 'Map') {
                return new Map(value.value);
            }
        }
        return value;
    }

    #convertParams(params,file=false){
        return new Promise(async (resolve, reject) => {
            try {
                this.#credentials = this.#getCredentials(params?.credentials)
                if (params?.headers !== undefined && params?.headers !== undefined) {
                    for (let [key, value] of params.headers) {
                        if (key.toLowerCase() != 'content-type') {
                            this.#headers.set(key, value)
                        }
                    }
                }
                if (this.#method == 'GET' || this.#method == 'DELETE') {
                    this.#headers.set('Content-type', 'application/x-www-form-urlencoded')
                    if (params?.body !== undefined && params?.body !== null) {
                        if (typeof HTMLFormElement === 'function' && (params.body instanceof HTMLFormElement || typeof params.body === 'string')) {
                            let container = (typeof HTMLFormElement ==='function' && params.body instanceof HTMLFormElement) ? params.body : document.getElementById(params.body)
                            if(container){
                                if (container.querySelector('input[type="file"]')) 
                                    throw new Error('Sending a file using the GET method is not possible')
                                let data = await JFormData.fromDOM(container)
                                this.#url = Url.encode(data, this.#url)
                            }else{
                                throw new Error('Form element with id not found!')
                            }
                        }else if (params.body instanceof Object && !(typeof HTMLElement === 'function' && params.body instanceof HTMLElement)) {
                            this.#url = Url.encode(params.body, this.#url)
                        } 
                    }
                } else if (file && params?.body !== undefined) {
                    if ((typeof File === 'function' && params.body instanceof File) 
                    || (typeof FileList === 'function' && params.body instanceof FileList)
                    || params.body instanceof JFile
                    || params.body instanceof JFileList) {
                        this.#isMultipartFilesSend = params?.isMultipart!=undefined ? params.isMultipart : this.#isMultipartFilesSend
                        if(this.#isMultipartFilesSend){
                            let form = new JFormData()
                            this.#headers.set('Content-type', 'multipart/form-data')
                            if (typeof File === 'function' && params.body instanceof File){
                                let file = await JFile.load(params.body)
                                if(file)
                                    form.set('files[]', file)
                                else
                                    reject(new Error('Failed to convert body data to JFileList!'))
                            }else if (typeof FileList === 'function' && params.body instanceof FileList){
                                let files = await JFileList.load(params.body)
                                if(files)
                                    form.set('files[]', files)
                                else
                                    reject(new Error('Failed to convert body data to JFileList!'))
                            }else
                                form.set('files[]', params.body)
                            let data = await form.toMultipart()
                            if(data)
                                this.#body = data
                            else 
                                throw new Error('Failed to convert data to multipart/form-data!')
                        }else{
                            let file = (typeof File === 'function' && params.body instanceof File) 
                                        ? await JFile.load(params.body) 
                                        : (params.body instanceof JFile ? params.body : undefined)
                            let mime = Jax.MIME_FILES.find(([key,value])=>key==file.contentType)
                            if (file && mime){
                                this.#headers.set('Content-type',file.contentType)
                                this.#body = file.data
                            }else{
                                reject(new Error('Failed to convert body data to JFile. Invalid data or Content-Type header!')) 
                            }
                        }
                    } else {
                        reject(new Error('The data could not be sent because the client must be of type JFile/File or JFileList/FileList!')) 
                    }
                } else {
                    let sendType = 'url'
                    this.#headers.set('Content-type', 'application/x-www-form-urlencoded');
                    if (typeof params?.sendType === 'string') {
                        switch (params.sendType) {
                            case Jax.SEND_TYPES.JSON:
                                sendType = 'json'
                                this.#headers.set('Content-type', 'application/json; charset=utf-8')
                                break
                            case Jax.SEND_TYPES.FORM:
                                sendType = 'form'
                                this.#headers.set('Content-type', 'multipart/form-data')
                                break
                            default:
                                sendType = 'url'
                                this.#headers.set('Content-type', 'application/x-www-form-urlencoded')
                                break
                        }
                    }
                    if (params?.body != undefined && params?.body != null) {
                        if (typeof HTMLFormElement === 'function' && (params.body instanceof HTMLFormElement || (typeof params.body === 'string' && !this.#isServer))) {
                            let container = (typeof HTMLFormElement === 'function' && params.body instanceof HTMLFormElement) ? params.body : document.getElementById(params.body)
                            if (container) {
                                params.body = await JFormData.fromDOM(container)
                                if (container.querySelector('input[type="file"]') != null) {
                                    this.#headers.set('Content-type', 'multipart/form-data')
                                    let data = await params.body.toMultipart()
                                    if(data)
                                        this.#body = data
                                    else 
                                        throw new Error('Failed to convert data to multipart/form-data!')
                                } else {
                                    switch (sendType) {
                                        case Jax.SEND_TYPES.JSON:
                                            this.#body = JSON.stringify(params.body.toObj(),this.#jsonMapReplacer)
                                            break
                                        case Jax.SEND_TYPES.FORM:
                                            let data = await params.body.toMultipart()
                                            if(data)
                                                this.#body = data
                                            else 
                                                throw new Error('Failed to convert data to multipart/form-data!')
                                            break
                                        case Jax.SEND_TYPES.URL:
                                            this.#body = Url.encode(params.body)
                                            break
                                    }
                                }
                            } else {
                                throw new Error('The HTMLFormElement passed to the data parameter is not a form or input')
                            }
                        } else if (params.body instanceof Object && !(typeof HTMLElement === 'function' && params.body instanceof HTMLElement)) {
                            let data
                            switch (sendType) {
                                case Jax.SEND_TYPES.JSON:
                                    data = (typeof FormData === 'function' && params.body instanceof FormData) 
                                    ? (await JFormData.from(params.body)).toObj() 
                                    : (params.body instanceof JFormData 
                                        ? params.body.toObj() 
                                        : params.body)
                                    this.#body = JSON.stringify(data,this.#jsonMapReplacer)
                                    break
                                case Jax.SEND_TYPES.FORM:
                                    if(params.body instanceof JFormData)
                                        data = await params.body.toMultipart()
                                    else
                                        data = await (await JFormData.from(params.body)).toMultipart()
                                    if(data)
                                        this.#body = data
                                    else 
                                        throw new Error('Failed to convert data to multipart/form-data!')
                                    break
                                case Jax.SEND_TYPES.URL:
                                    this.#body = Url.encode(params.body)
                                    break
                            }
                        }
                    }
                }
                if (typeof params?.responseType === 'string') {
                    let issetType = false
                    for (let item in Jax.RESPONSE_TYPES) {
                        if (params.responseType == Jax.RESPONSE_TYPES[item]) {
                            this.#responseType = Jax.RESPONSE_TYPES[item]
                            issetType = true
                            break
                        }
                    }
                    if (!issetType) this.#responseType = Jax.RESPONSE_TYPES.JSON
                } else {
                    this.#responseType = Jax.RESPONSE_TYPES.JSON
                }
                if (typeof params?.progress === 'function' && !this.#isServer) this.#onprogress = params.progress
                resolve(true)
            } catch (err) {
                reject(err)
            }
        })
    }

    async #sendServer(){
        return new Promise(async (resolve, reject) => {
            let options, http, data = []
            try {
                let proto = this.#url.match(/^(http:\/\/|https:\/\/)/gi)
                if(proto!=null && proto?.length)
                    this.#protocol = proto[0].replace(/[\/\\\:]/g,'')
                let str = this.#url.replace(/^(http:\/\/|https:\/\/)/,'')
                let length = this.#body instanceof Uint8Array 
                    ? this.#body.length 
                    : (typeof this.#body ==='string' 
                        ? new JBuffer(this.#body).length
                        : 0)
                if(this.#method=='POST'||this.#method=='PUT') this.#headers.set('Content-Length',length)
                http = (await import(this.#protocol)).default
                str = str.split('/')
                let host = str.shift()
                let port = this.#protocol == 'http' ? 80 : 443
                if(/\:[0-9]{1,6}$/.test(host)){
                    let hostData = host.split(':')
                    host = hostData.shift()
                    port = hostData.pop()
                }
                let url = str.join('/')
                options = {
                    hostname: host,
                    port: port,
                    path: `/${url}`,
                    method: this.#method,
                    headers: Object.fromEntries(this.#headers)
                }
                const req = http.request(options, (res) => {
                    res.on('data', (chunk) => {
                        data.push(chunk)
                    })
                    res.on('end', () => {
                        let result
                        this.#onprogress = null
                        this.#credentials = null
                        this.#method = null
                        this.#headers.clear()
                        this.#body = null
                        this.#url = null
                        if(data.length){
                            switch (this.#responseType) {
                                case Jax.RESPONSE_TYPES.TEXT: 
                                    if(data.length==1) 
                                        result=data[0].toString('utf8') 
                                    else 
                                        result = data.reduce((pValue, cValue) => pValue + cValue.toString('utf8')) 
                                    break
                                case Jax.RESPONSE_TYPES.BLOB:
                                    result = new Blob(data)
                                case Jax.RESPONSE_TYPES.BUFFER: 
                                    result = new JBuffer(data)
                                    break
                                case Jax.RESPONSE_TYPES.JSON: 
                                    if(data.length==1) 
                                        result=data[0].toString('utf8') 
                                    else 
                                        result = data.reduce((pValue, cValue) => pValue + cValue.toString('utf8')) 
                                    result = JSON.parse(result);
                                    break
                                
                                case Jax.RESPONSE_TYPES.DOC: 
                                    if(data.length==1) 
                                        result=data[0].toString('utf8') 
                                    else  
                                        result = data.reduce((pValue, cValue) => pValue + cValue.toString('utf8')) 
                                    break
                                
                                default: 
                                    if(data.length==1) 
                                        result=data[0].toString('utf8')
                                    else 
                                        result = data.reduce((pValue, cValue) => pValue + cValue.toString('utf8')) 
                                    break
                            }
                            resolve({data:result,success:true})
                        }else{
                            resolve({success:true})
                        }
                        this.#responseType=null
                    });
                })
                req.on('error', (err) => reject(err))
                if(this.#method=='POST'||this.#method=='PUT') req.write(this.#body)
                req.end()
            } catch (err) {
                reject(err)
            }
        })
    }

    async #send(){
        return new Promise((resolve,reject)=>{
            let req = this.#create()
            if (typeof this.#credentials === 'boolean' && !this.#isServer) 
                req.withCredentials = this.#credentials
            if(typeof this.#onprogress === 'function')
                req.upload.onprogress = this.#onprogress
            req.responseType = this.#responseType
            req.addEventListener('load',function(ev){
                this.#onprogress = null
                this.#credentials = null
                this.#method = null
                this.#headers.clear()
                this.#body=null
                this.#url=null
                resolve({data:ev.target.response,success:true})
            }.bind(this))
            req.addEventListener('timeout', ()=>{
                reject(new Error('Request timeout was reached!'))
            })
            req.addEventListener('error',function(err){
                reject(err)
            }.bind(this))
            req.open(this.#method,this.#url,true)
            for(let [key,value] of this.#headers){
                req.setRequestHeader(key,value)
            }
            try{
                if(this.#method=='POST'||this.#method=='PUT') req.send(this.#body)
                else req.send(null)
            }catch(err){
                reject(err)
            }
        })
    }

    async #sendFetch(){
        return new Promise((resolve,reject) => {
            let options = {}
            if(this.#method=='POST'||this.#method=='PUT'){
                options = {
                    method:this.#method,
                    headers:this.#headers,
                    body:this.#body,
                    credentials: this.#credentials
                }
            }
            fetch(this.#url,options)
                .then(res => res.ok ? res : Promise.reject(res))
                .then(async data => {
                    switch(this.#responseType){
                        case Jax.RESPONSE_TYPES.TEXT: 
                            return data.text()
                        case Jax.RESPONSE_TYPES.BLOB:
                            return data.blob()
                        case Jax.RESPONSE_TYPES.BUFFER:
                            return new JBuffer(await data.arrayBuffer())
                        case Jax.RESPONSE_TYPES.JSON:
                            return data.json()
                        default:
                            return data.text()
                    }
                }).then(result=>{
                    let response = (this.#responseType === Jax.RESPONSE_TYPES.DOC && typeof result === 'string' && typeof DOMParser === 'function') ?
                        {
                           html:new DOMParser().parseFromString(result, 'text/html'), 
                           xml:new DOMParser().parseFromString(result, 'application/xml'),
                           svg:new DOMParser().parseFromString(result, 'image/svg+xml')
                        }:
                        result
                    this.#method = null
                    this.#onprogress = null
                    this.#credentials = null
                    this.#headers.clear()
                    this.#body=null
                    this.#url=null
                    this.#responseType=null
                    resolve({success:true,data:response})
                })
                .catch(err=>reject(err))
        })
    }
}

export default Jax


