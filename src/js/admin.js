/**
 * @package: 	GlimFSE Optimization
 * @author: 	Zied Jridet
 * @license:	https://www.glimfse.com/
 * @version:	1.0.0
 */

const {
    i18n: {
        __,
    },
    hooks: {
        addFilter
    },
    components: {
        Placeholder,
        Card,
        CardHeader,
        CardBody,
        Spinner,
        Button,
        TextControl,
        TextareaControl,
        BaseControl,
        ColorPicker,
        RangeControl,
        DropdownMenu,
        SelectControl,
        ToggleControl,
        ColorIndicator,
        __experimentalHStack: HStack,
        __experimentalNumberControl: NumberControl,
        __experimentalBorderBoxControl: BorderBoxControl,
    },
    element: {
        useState,
    },
    blockEditor: {
        useSetting
    },
} = wp;

addFilter('glimfse.admin.tabs.plugins', 'glimfse/optimization/admin/panel', optionsPanel);
function optionsPanel(panels) {
    return [...panels, {
        name: 'wca-optimization',
        title: __('Optimization'),
        render: (props) => <Options {...props} />
    }];
}

const Options = (props) => {
    const { settings, saveSettings, isRequesting, createNotice } = props;

    if (isRequesting || !settings) {
        return <Placeholder {...{
            icon: <Spinner />,
            label: __('Loading'),
            instructions: __('Please wait, loading settings...', 'glimfse')
        }} />;
    }

    const apiOptions = (({ optimization }) => (optimization))(settings);
    const [loading, setLoading] = useState(null);
    const [formData, setFormData] = useState(apiOptions);

    const setHeaderOption = (option) => {
        setFormData({ ...formData, header: { ...formData.header, ...option } });
    }

    const handleNotice = () => {
        setLoading(false);

        return createNotice('success', __('Settings saved.', 'glimfse'));
    };

    return (
        <>
            <div className="grid" style={{ '--wca--columns': 2 }}>
                <div className="g-col-1">
                    <Card className="border shadow-none">
                        <CardHeader>
                            <HStack>
                                <h5 className="text-uppercase fw-medium m-0">{__('Header', 'glimfse')}</h5>
                                <ToggleControl
                                    label={__('Clean Header?', 'glimfse')}
                                    className="m-0"
                                    checked={formData?.header === true}
                                    onChange={header => setFormData({ ...formData, header })}
                                />
                            </HStack>
                        </CardHeader>
                        <CardBody style={{ color: 'rgb(30, 30, 30)' }}>
                            <p>
                                <ToggleControl
                                    label={__('WP Generator', 'glimfse')}
                                    help={__('Remove WP Generator meta tag.', 'glimfse')}
                                    checked={formData?.header?.wpGenerator || formData?.header === true}
                                    disabled={formData?.header === true}
                                    onChange={wpGenerator => setHeaderOption({ wpGenerator })}
                                />
                            </p>
                            <p>
                                <ToggleControl
                                    label={__('RSD Link', 'glimfse')}
                                    help={__('Remove Really Simple Discovery service endpoint.', 'glimfse')}
                                    checked={formData?.header?.rsdLink || formData?.header === true}
                                    disabled={formData?.header === true}
                                    onChange={rsdLink => setHeaderOption({ rsdLink })}
                                />
                            </p>
                            <p>
                                <ToggleControl
                                    label={__('Feed Links', 'glimfse')}
                                    help={__('Remove the feed links.', 'glimfse')}
                                    checked={formData?.header?.feedLinks || formData?.header === true}
                                    disabled={formData?.header === true}
                                    onChange={feedLinks => setHeaderOption({ feedLinks })}
                                />
                            </p>
                            <p>
                                <ToggleControl
                                    label={__('Shortlink', 'glimfse')}
                                    help={__('Remove the rel=shortlink.', 'glimfse')}
                                    checked={formData?.header?.shortLink || formData?.header === true}
                                    disabled={formData?.header === true}
                                    onChange={shortLink => setHeaderOption({ shortLink })}
                                />
                            </p>
                            <p>
                                <ToggleControl
                                    label={__('Rest API', 'glimfse')}
                                    help={__('Remove the REST API link tag.', 'glimfse')}
                                    checked={formData?.header?.restApi || formData?.header === true}
                                    disabled={formData?.header === true}
                                    onChange={restApi => setHeaderOption({ restApi })}
                                />
                            </p>
                            <p>
                                <ToggleControl
                                    label={__('oEmbed', 'glimfse')}
                                    help={__('Remove oEmbed discovery links.', 'glimfse')}
                                    checked={formData?.header?.oEmbed || formData?.header === true}
                                    disabled={formData?.header === true}
                                    onChange={oEmbed => setHeaderOption({ oEmbed })}
                                />
                            </p>
                            <p>
                                <ToggleControl
                                    label={__('Emoji', 'glimfse')}
                                    help={__('Remove WP Emojis and fallback to browser`s emoji.', 'glimfse')}
                                    checked={formData?.header?.emoji || formData?.header === true}
                                    disabled={formData?.header === true}
                                    onChange={emoji => setHeaderOption({ emoji })}
                                />
                            </p>
                            <p>
                                <ToggleControl
                                    label={__('Dashicons CSS', 'glimfse')}
                                    help={__('Remove Dashicons CSS in frontend.', 'glimfse')}
                                    checked={formData?.header?.dashicons || formData?.header === true}
                                    disabled={formData?.header === true}
                                    onChange={dashicons => setHeaderOption({ dashicons })}
                                />
                            </p>
                            <p>
                                <ToggleControl
                                    label={__('Default Scripts', 'glimfse')}
                                    help={__('Move default scripts to footer.', 'glimfse')}
                                    checked={formData?.header?.footerScripts || formData?.header === true}
                                    disabled={formData?.header === true}
                                    onChange={footerScripts => setHeaderOption({ footerScripts })}
                                />
                            </p>
                        </CardBody>
                    </Card>
                </div>
                <div className="g-col-1">
                    <Card className="border shadow-none position-sticky sticky-top h-100">
                        <CardHeader>
                            <h5 className="text-uppercase fw-medium m-0">{__('Preloading', 'glimfse')}</h5>
                        </CardHeader>
                        <CardBody style={{ color: 'rgb(30, 30, 30)' }}>
                            <p>
                                <ToggleControl
                                    label={__('Instant Page', 'glimfse')}
                                    help={__('Automatically prefetch URLs in the background when a user hovers over a link.', 'glimfse')}
                                    checked={formData?.preload?.instantPage}
                                    onChange={instantPage => setFormData({ ...formData, preload: { ...formData.preload, instantPage } })}
                                />
                            </p>
                            <p>
                                <ToggleControl
                                    label={__('Preload Viewport Media', 'glimfse')}
                                    help={__('Automatically preload resources that are needed right away or very soon during a page load.', 'glimfse')}
                                    checked={formData?.preload?.preloadViewport}
                                    onChange={preloadViewport => setFormData({ ...formData, preload: { ...formData.preload, preloadViewport } })}
                                />
                            </p>
                            <p>
                                <TextareaControl
                                    label={__('Preconnect', 'glimfse')}
                                    help={__('Preconnect allows the browser to set up early connections before an HTTP request, eliminating round-trip latency and saving time for users. Format: https://example.com|crossorigin', 'glimfse')}
                                    value={formData?.preload?.preconnect?.join('\n')}
                                    onChange={preconnect => {
                                        const asArray = preconnect ? preconnect.split('\n') : [];
                                        setFormData({ ...formData, preload: { ...formData.preload, preconnect: asArray } });
                                    }}
                                />
                            </p>
                            <p>
                                <TextareaControl
                                    label={__('DNS Prefetch', 'glimfse')}
                                    help={__('Resolve DNS before a user clicks - one per line. Format: //example.com', 'glimfse')}
                                    value={formData?.preload?.dnsPrefetch?.join('\n')}
                                    onChange={dnsPrefetch => {
                                        const asArray = dnsPrefetch ? dnsPrefetch.split('\n') : [];
                                        setFormData({ ...formData, preload: { ...formData.preload, dnsPrefetch: asArray } });
                                    }}
                                />
                            </p>
                        </CardBody>
                    </Card>
                </div>
            </div>
            <hr style={{ margin: '20px 0' }} />
            <Button
                className="button"
                isPrimary
                isLarge
                icon={loading && <Spinner />}
                onClick={() => {
                    setLoading(true);
                    saveSettings({ optimization: formData }, handleNotice);
                }}
                {...{ disabled: loading }}
            >
                {loading ? '' : __('Save', 'glimfse')}
            </Button>
        </>
    );
};