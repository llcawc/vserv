export default function make({ config, rootdir, pubdir, outdir, files, }?: {
    config?: string | undefined;
    rootdir?: string | undefined;
    pubdir?: string | undefined;
    outdir?: string | undefined;
    files?: string[] | undefined;
}): Promise<void>;
